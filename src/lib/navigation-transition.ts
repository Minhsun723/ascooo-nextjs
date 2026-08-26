let skipOpeningTransitionOnNextNavigation = false;

export function markSkipOpeningTransitionForNextNavigation() {
  skipOpeningTransitionOnNextNavigation = true;
}

export function consumeSkipOpeningTransitionForNavigation() {
  const shouldSkip = skipOpeningTransitionOnNextNavigation;
  skipOpeningTransitionOnNextNavigation = false;
  return shouldSkip;
}
