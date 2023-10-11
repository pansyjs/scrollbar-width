export interface IScrollbarWidth {
  (force?: boolean): number | undefined;

  __cache?: number;
}

export const scrollbarWidth: IScrollbarWidth = (force?: boolean): number | undefined => {
  if (typeof document === 'undefined') {
    return 0;
  }

  if (!document.body || (document.readyState && document.readyState === 'loading')) {
    return undefined;
  }

  if (force !== true && typeof scrollbarWidth.__cache === 'number') {
    return scrollbarWidth.__cache;
  }

  const el = document.createElement('div');
  const { style } = el;

  style.display = 'block';
  style.position = 'absolute';
  style.width = '100px';
  style.height = '100px';
  style.left = '-999px';
  style.top = '-999px';
  style.overflow = 'scroll';

  document.body.insertBefore(el, null);

  const { clientWidth } = el;

  if (clientWidth === 0) {
    document.body.removeChild(el);
    return undefined;
  }

  scrollbarWidth.__cache = 100 - clientWidth;

  document.body.removeChild(el);

  return scrollbarWidth.__cache;
};
