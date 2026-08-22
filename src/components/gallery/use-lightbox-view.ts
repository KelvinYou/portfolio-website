"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const SWIPE_THRESHOLD = 50;

interface UseLightboxViewArgs {
  isOpen: boolean;
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
}

/**
 * View state for the lightbox stage: zoom, pan, rotation, auto-hiding chrome
 * and touch gestures. Kept out of the component so the JSX stays readable.
 */
export function useLightboxView({
  isOpen,
  currentIndex,
  onNext,
  onPrevious,
}: UseLightboxViewArgs) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showChrome, setShowChrome] = useState(true);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  const dragOrigin = useRef({ x: 0, y: 0 });
  const touchOrigin = useRef({ x: 0, y: 0 });
  const touchLatest = useRef({ x: 0, y: 0 });
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(hover: none)");
    const sync = () => setIsCoarsePointer(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  // Arms the auto-hide timer without touching state, so it is safe to call
  // from an effect body.
  const scheduleHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowChrome(false), 3200);
  }, []);

  const revealChrome = useCallback(() => {
    setShowChrome(true);
    scheduleHide();
  }, [scheduleHide]);

  // Reset the stage during render when the open item changes — before paint,
  // without a cascading re-render.
  const viewKey = isOpen ? currentIndex : null;
  const [prevViewKey, setPrevViewKey] = useState<number | null>(null);
  if (viewKey !== prevViewKey) {
    setPrevViewKey(viewKey);
    if (isOpen) {
      setZoom(1);
      setRotation(0);
      setPan({ x: 0, y: 0 });
      setShowChrome(true);
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    scheduleHide();
    const onMove = () => revealChrome();
    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [isOpen, currentIndex, scheduleHide, revealChrome]);

  const zoomIn = useCallback(
    () => setZoom((z) => Math.min(z * 1.5, MAX_ZOOM)),
    [],
  );
  const zoomOut = useCallback(
    () =>
      setZoom((z) => {
        const next = Math.max(z / 1.5, MIN_ZOOM);
        if (next === MIN_ZOOM) setPan({ x: 0, y: 0 });
        return next;
      }),
    [],
  );
  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);
  const rotate = useCallback(() => setRotation((r) => (r + 90) % 360), []);

  const toggleZoom = useCallback(() => {
    if (zoom > 1) resetZoom();
    else setZoom(2);
  }, [zoom, resetZoom]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragOrigin.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    setPan({
      x: e.clientX - dragOrigin.current.x,
      y: e.clientY - dragOrigin.current.y,
    });
  };

  const endDrag = () => setIsDragging(false);

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchOrigin.current = { x: touch.clientX, y: touch.clientY };
    touchLatest.current = { x: touch.clientX, y: touch.clientY };
    if (zoom > 1) {
      setIsDragging(true);
      dragOrigin.current = {
        x: touch.clientX - pan.x,
        y: touch.clientY - pan.y,
      };
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchLatest.current = { x: touch.clientX, y: touch.clientY };
    if (isDragging && zoom > 1) {
      setPan({
        x: touch.clientX - dragOrigin.current.x,
        y: touch.clientY - dragOrigin.current.y,
      });
    }
  };

  const onTouchEnd = () => {
    if (!isDragging) {
      const deltaX = touchOrigin.current.x - touchLatest.current.x;
      const deltaY = Math.abs(touchOrigin.current.y - touchLatest.current.y);
      if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > deltaY) {
        if (deltaX > 0) onNext();
        else onPrevious();
      } else if (Math.abs(deltaX) < 10 && deltaY < 10) {
        revealChrome();
      }
    }
    setIsDragging(false);
  };

  return {
    zoom,
    rotation,
    pan,
    isDragging,
    showChrome,
    isCoarsePointer,
    revealChrome,
    zoomIn,
    zoomOut,
    resetZoom,
    toggleZoom,
    rotate,
    stageHandlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp: endDrag,
      onMouseLeave: endDrag,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}
