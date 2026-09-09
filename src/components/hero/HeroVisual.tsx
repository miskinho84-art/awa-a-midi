import { Component, Suspense, lazy, useCallback, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";
import { HeroStatic } from "./HeroStatic";

const HeroScene = lazy(() => import("./HeroScene"));

const DESKTOP_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl")));
  } catch {
    return false;
  }
}

function isCapableDevice(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  return cores >= 4 && memory >= 4;
}

class SceneErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function HeroVisual() {
  const reduce = useReducedMotion();
  const desktop = useMediaQuery(DESKTOP_QUERY);
  const [enable3D, setEnable3D] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (failed || reduce || !desktop || !isCapableDevice() || !supportsWebGL()) {
      setEnable3D(false);
      setReady(false);
      return;
    }
    let cancelled = false;
    const start = () => {
      if (!cancelled) setEnable3D(true);
    };
    const idle = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if (typeof idle.requestIdleCallback === "function") {
      idleId = idle.requestIdleCallback(start, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(start, 1000);
    }
    return () => {
      cancelled = true;
      if (idleId !== undefined) idle.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [failed, reduce, desktop]);

  const handleReady = useCallback(() => setReady(true), []);
  const handleError = useCallback(() => {
    setFailed(true);
    setReady(false);
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[600px]">
      <div
        aria-hidden="true"
        className="absolute inset-[-6%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(228,87,46,0.26),rgba(233,180,76,0.12)_45%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[1%] rounded-full border border-dashed border-terracotta-500/25 motion-safe:animate-spin-slow"
      />
      <div aria-hidden="true" className="absolute inset-[12%] rounded-full border border-forest-500/15" />
      <div
        aria-hidden="true"
        className="absolute bottom-[-2%] left-1/2 h-[12%] w-[64%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(42,23,16,0.26),transparent_70%)]"
      />

      <HeroStatic hidden={ready} />

      {enable3D && (
        <SceneErrorBoundary onError={handleError}>
          <Suspense fallback={null}>
            <HeroScene
              onReady={handleReady}
              className={cn(
                "absolute -inset-[15%] transition-opacity duration-1000",
                ready ? "opacity-100" : "opacity-0",
              )}
            />
          </Suspense>
        </SceneErrorBoundary>
      )}
    </div>
  );
}
