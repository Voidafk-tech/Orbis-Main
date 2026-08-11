import React, { useEffect, useRef, useState } from 'react';
import { useCopy } from './LocaleContext';
import { EVENTS, linkArea, trackEvent } from './analytics';

/**
 * WeChat as a way to reach the practice.
 *
 * Two pieces, because the two placements want different amounts of it:
 * `WeChatId` is the ID and its copy control, used on its own in the contact
 * page's "reach us directly" list; the default export wraps it with the account
 * name and the QR code for the intake section.
 *
 * The ID leads and the QR follows, in both. A QR is only usable by someone
 * holding a second device — a visitor reading this on the phone WeChat is
 * installed on cannot scan their own screen, and they are the majority. For
 * them the ID, copied in one tap, is the whole feature.
 */

/**
 * The Weixin ID, with a copy button when the browser will give us the
 * clipboard.
 *
 * `canCopy` is resolved in an effect rather than while rendering. Routes are
 * prerendered by scripts/prerender.mjs, where `navigator` does not exist, so a
 * check during render would put a button in the client's first render that is
 * absent from the server's markup — which is a hydration mismatch, and React
 * resolves those by throwing the server markup away.
 */
export const WeChatId: React.FC = () => {
  const copy = useCopy();
  const t = copy.ui.wechat;
  const { WECHAT } = copy.site;

  const [canCopy, setCanCopy] = useState(false);
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setCanCopy(typeof navigator !== 'undefined' && Boolean(navigator.clipboard));
    // Without this, navigating away inside the two seconds below leaves a
    // timer holding a setter for an unmounted component.
    return () => window.clearTimeout(timer.current);
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(WECHAT.id);
    } catch {
      // Permission refused, or an insecure origin. The ID is selectable text
      // regardless, so this fails quietly rather than reporting a problem with
      // something the visitor can still do by hand.
      return;
    }

    setCopied(true);
    if (buttonRef.current) {
      trackEvent(EVENTS.wechat, { link_location: linkArea(buttonRef.current) });
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <p className="wechat__id-row">
      <span className="wechat__id">{WECHAT.id}</span>
      {canCopy && (
        <button
          type="button"
          className="wechat__copy"
          ref={buttonRef}
          onClick={onCopy}
          aria-label={`${t.copyAria} ${WECHAT.id}`}
        >
          {t.copy}
        </button>
      )}
      {/* Announced when it fills, and always present so the row does not
          reflow when it does. */}
      <span className="wechat__copied" role="status">
        {copied ? t.copied : ''}
      </span>
    </p>
  );
};

const WeChatContact: React.FC = () => {
  const copy = useCopy();
  const t = copy.ui.wechat;
  const { WECHAT } = copy.site;

  /*
   * Whether the code is on the page at all.
   *
   * This used to swap in a caption reading "WeChat QR code to be supplied",
   * which was written for whoever was building the page and then shipped to
   * customers, who read it as an unfinished site. The empty frame and the
   * "scan to add us" line under it were worse than the missing image: they
   * point at something that is not there.
   *
   * So the whole column goes instead. What remains — the account name, the ID
   * and a button that copies it — is not a degraded version of the feature. It
   * is the half that actually works on a phone, where nobody can scan a code
   * shown on the screen they are reading it from. When the file lands the
   * column comes back with no other change.
   *
   * The mount check is not redundant with `onError`: this markup is
   * prerendered, so the image can finish failing before React attaches the
   * handler, and then nothing would ever fire. The image is also lazy, so on
   * the home page — where this sits far below the fold — neither fires until
   * the visitor scrolls to it. That is why the column is removed rather than
   * never rendered: at that point it has a fixed-size box and takes nothing
   * with it when it goes.
   */
  const [missing, setMissing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setMissing(true);
  }, []);

  return (
    <div className="wechat">
      <div className="wechat__text">
        <p className="micro intake__contact-label">{t.label}</p>
        <p className="wechat__account">{WECHAT.account}</p>
        <p className="micro wechat__id-label">{t.idLabel}</p>
        <WeChatId />
      </div>

      {!missing && (
        <div className="wechat__qr">
          <div className="wechat__qr-box">
            <img
              ref={imgRef}
              className="wechat__qr-img"
              src={WECHAT.src}
              alt={WECHAT.alt}
              // The file's real pixel dimensions, which are not square: what is
              // in public/wechat-qr.png is the whole WeChat share card rather
              // than a crop of the code. These said 120x120 for a while, which
              // declared an aspect ratio the file does not have.
              //
              // Nothing rendered differently either way — .wechat__qr-img sets
              // width and height to 100% and the box carries the matching
              // `aspect-ratio`, so CSS decides the shape and reserves the space.
              // These are the pre-CSS hint, and a wrong one is worth no more
              // than a right one.
              width={592}
              height={798}
              loading="lazy"
              onError={() => setMissing(true)}
            />
          </div>
          <p className="wechat__scan">{t.scan}</p>
        </div>
      )}
    </div>
  );
};

export default WeChatContact;
