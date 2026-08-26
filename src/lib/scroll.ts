export const SMOOTH_SCROLL_REQUEST_EVENT = "ascooo:smooth-scroll-request";

export interface SmoothScrollRequestDetail {
  target: number | string;
  offset?: number;
}

let resetScrollOnNextNavigation = false;

export function markScrollResetForNextNavigation() {
  resetScrollOnNextNavigation = true;
}

export function consumeScrollResetForNavigation() {
  const shouldReset = resetScrollOnNextNavigation;
  resetScrollOnNextNavigation = false;
  return shouldReset;
}

export function requestSmoothScroll(detail: SmoothScrollRequestDetail) {
  const event = new CustomEvent<SmoothScrollRequestDetail>(SMOOTH_SCROLL_REQUEST_EVENT, {
    cancelable: true,
    detail,
  });

  window.dispatchEvent(event);
  return event.defaultPrevented;
}
