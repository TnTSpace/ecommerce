import type { EmblaCarouselType } from 'embla-carousel'

const addTogglePrevNextBtnsActive = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement
): (() => void) => {
  const togglePrevNextBtnsState = (): void => {
    if (emblaApi.canScrollPrev()) prevBtn.removeAttribute('disabled')
    else prevBtn.setAttribute('disabled', 'disabled')

    if (emblaApi.canScrollNext()) nextBtn.removeAttribute('disabled')
    else nextBtn.setAttribute('disabled', 'disabled')
  }

  emblaApi
    .on('select', togglePrevNextBtnsState)
    .on('init', togglePrevNextBtnsState)
    .on('reInit', togglePrevNextBtnsState)

  return (): void => {
    prevBtn.removeAttribute('disabled')
    nextBtn.removeAttribute('disabled')
  }
}

export const addPrevNextBtnsClickHandlers = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement
): (() => void) => {
  const scrollPrev = (): void => {
    emblaApi.scrollPrev()
  }
  const scrollNext = (): void => {
    emblaApi.scrollNext()
  }
  prevBtn.addEventListener('click', scrollPrev, false)
  nextBtn.addEventListener('click', scrollNext, false)

  const removeTogglePrevNextBtnsActive = addTogglePrevNextBtnsActive(
    emblaApi,
    prevBtn,
    nextBtn
  )

  return (): void => {
    removeTogglePrevNextBtnsActive()
    prevBtn.removeEventListener('click', scrollPrev, false)
    nextBtn.removeEventListener('click', scrollNext, false)
  }
}

export const addPlayBtnListeners = (
  emblaApi: EmblaCarouselType,
  playBtn: HTMLElement
): (() => void) => {
  const togglePlayBtnState = (emblaApi: EmblaCarouselType): void => {
    console.log({ msg: "before autoplay check" })
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    console.log({ msg: "after autoplay check" })

    const buttonText = autoplay.isPlaying() ? 'Start' : 'Stop'
    playBtn.innerHTML = buttonText
  }

  const onPlayBtnClick = (): void => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play
    playOrStop()
  }

  playBtn.addEventListener('click', onPlayBtnClick)
  emblaApi
    .on('autoplay:play', togglePlayBtnState)
    .on('autoplay:stop', togglePlayBtnState)
    .on('reInit', togglePlayBtnState)

  return () => {
    playBtn.removeEventListener('click', onPlayBtnClick)
    emblaApi
      .off('autoplay:play', togglePlayBtnState)
      .off('autoplay:stop', togglePlayBtnState)
      .off('reInit', togglePlayBtnState)
  }
}

export const addNavBtnListeners = (
  emblaApi: EmblaCarouselType,
  ...navButtons: HTMLElement[]
): (() => void) => {
  const onNavClick = () => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }

  navButtons.forEach((navButton) =>
    navButton.addEventListener('click', onNavClick, true)
  )

  return () => {
    navButtons.forEach((navButton) =>
      navButton.removeEventListener('click', onNavClick, true)
    )
  }
}
