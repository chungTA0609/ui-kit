"use client"

import { useState } from "react"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader"
import { LottieAnimation } from "../LottieAnimation/LottieAnimation"
import { MarqueeText } from "../MarqueeText/MarqueeText"
import { Button } from "../../ui/Button/Button"
import "./AnimationDemo.scss"

export function AnimationDemo() {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleLoadClick = () => {
    setIsLoading(true)
    setShowSuccess(false)

    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
    }, 3000)
  }

  return (
    <div className="animation-demo">
      <section className="animation-demo__section">
        <h2 className="animation-demo__title">Loading Spinners</h2>
        <div className="animation-demo__spinners">
          <div className="animation-demo__spinner-item">
            <LoadingSpinner size="small" color="primary" />
            <span className="animation-demo__label">Small</span>
          </div>
          <div className="animation-demo__spinner-item">
            <LoadingSpinner size="medium" color="secondary" />
            <span className="animation-demo__label">Medium</span>
          </div>
          <div className="animation-demo__spinner-item">
            <LoadingSpinner size="large" color="success" />
            <span className="animation-demo__label">Large</span>
          </div>
          <div className="animation-demo__spinner-item">
            <LoadingSpinner size="medium" color="warning" thickness={5} />
            <span className="animation-demo__label">Thick</span>
          </div>
          <div className="animation-demo__spinner-item">
            <LoadingSpinner size="medium" color="danger" label="Loading..." />
            <span className="animation-demo__label">With Label</span>
          </div>
        </div>
      </section>

      <section className="animation-demo__section">
        <h2 className="animation-demo__title">Skeleton Loaders</h2>
        <div className="animation-demo__skeletons">
          <div className="animation-demo__skeleton-item">
            <SkeletonLoader variant="text" count={3} />
            <span className="animation-demo__label">Text</span>
          </div>
          <div className="animation-demo__skeleton-item">
            <SkeletonLoader variant="circular" />
            <span className="animation-demo__label">Circular</span>
          </div>
          <div className="animation-demo__skeleton-item">
            <SkeletonLoader variant="rectangular" height={100} />
            <span className="animation-demo__label">Rectangular</span>
          </div>
          <div className="animation-demo__skeleton-item">
            <div className="animation-demo__card-skeleton">
              <SkeletonLoader variant="rectangular" height={140} />
              <div className="animation-demo__card-content">
                <SkeletonLoader variant="text" height={24} />
                <SkeletonLoader variant="text" count={2} />
                <SkeletonLoader variant="text" width="60%" />
              </div>
            </div>
            <span className="animation-demo__label">Card</span>
          </div>
        </div>
      </section>

      <section className="animation-demo__section">
        <h2 className="animation-demo__title">Lottie Animations</h2>
        <div className="animation-demo__lottie">
          <div className="animation-demo__lottie-container">
            <div className="animation-demo__lottie-demo">
              <Button variant="primary" onClick={handleLoadClick} disabled={isLoading}>
                {isLoading ? "Loading..." : "Load Data"}
              </Button>

              <div className="animation-demo__lottie-animation">
                {isLoading && (
                  <LottieAnimation
                    path="https://assets2.lottiefiles.com/packages/lf20_usmfx6bp.json"
                    width={200}
                    height={200}
                    loop={true}
                  />
                )}

                {showSuccess && (
                  <LottieAnimation
                    path="https://assets9.lottiefiles.com/packages/lf20_uu0x8lqv.json"
                    width={200}
                    height={200}
                    loop={false}
                  />
                )}
              </div>
            </div>

            <div className="animation-demo__lottie-examples">
              <div className="animation-demo__lottie-example">
                <LottieAnimation
                  path="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
                  width={150}
                  height={150}
                  loop={true}
                />
                <span className="animation-demo__label">Infinite Animation</span>
              </div>

              <div className="animation-demo__lottie-example">
                <LottieAnimation
                  path="https://assets2.lottiefiles.com/private_files/lf30_bn5winlb.json"
                  width={150}
                  height={150}
                  loop={true}
                />
                <span className="animation-demo__label">Social Media</span>
              </div>

              <div className="animation-demo__lottie-example">
                <LottieAnimation
                  path="https://assets7.lottiefiles.com/packages/lf20_M9p23l.json"
                  width={150}
                  height={150}
                  loop={true}
                />
                <span className="animation-demo__label">Weather</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="animation-demo__section">
        <h2 className="animation-demo__title">Marquee Text</h2>
        <div className="animation-demo__marquee">
          <div className="animation-demo__marquee-item">
            <MarqueeText speed={30}>
              <div className="animation-demo__marquee-content">
                <span>Breaking News:</span>
                <span>
                  This is a scrolling text effect that can be used for announcements, news, or other important
                  information.
                </span>
                <span>Hover over the text to pause the animation.</span>
              </div>
            </MarqueeText>
            <span className="animation-demo__label">Left to Right</span>
          </div>

          <div className="animation-demo__marquee-item">
            <MarqueeText speed={50} direction="right">
              <div className="animation-demo__marquee-content animation-demo__marquee-content--special">
                <span>🚀</span>
                <span>Special Offer!</span>
                <span>🔥</span>
                <span>Limited Time Only!</span>
                <span>💯</span>
                <span>Don't Miss Out!</span>
                <span>🎉</span>
              </div>
            </MarqueeText>
            <span className="animation-demo__label">Right to Left (Faster)</span>
          </div>
        </div>
      </section>
    </div>
  )
}

