<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import legacyCarouselContent from '../../../../../json/carouselContent.json'
  // import carouselContentForCapytale from '../../../../../json/carouselContentForCapytale.json'
  import ButtonTextAction from '../../../../shared/forms/ButtonTextAction.svelte'
  import { globalOptions } from '../../../../../lib/stores/generalStore'

  let currentSlideIndex = 0
  let intervalId: number | null = null
  let isPaused = false

  // let carouselContent = $globalOptions.recorder === 'capytale' ? carouselContentForCapytale : legacyCarouselContent
  let carouselContent = legacyCarouselContent

  // Configuration de l'animation
  const SLIDE_DURATION = 5000 // 5 secondes par slide
  const TRANSITION_DURATION = 500 // 500ms pour la transition

  function nextSlide(): void {
    if (carouselContent.slides && carouselContent.slides.length > 0) {
      currentSlideIndex =
        (currentSlideIndex + 1) % carouselContent.slides.length
      scrollToSlide(currentSlideIndex)
    }
  }

  function goToSlide(index: number): void {
    currentSlideIndex = index
    scrollToSlide(index)
  }

  function scrollToSlide(index: number): void {
    const slideElement = document.getElementById(`carousel-item${index}`)
    if (slideElement) {
      slideElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      })
    }
  }

  function startAutoPlay(): void {
    if (!intervalId) {
      intervalId = setInterval(nextSlide, SLIDE_DURATION) as unknown as number
    }
  }
  function stopAutoPlay(): void {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function togglePause(): void {
    isPaused = !isPaused
    if (isPaused) {
      stopAutoPlay()
    } else {
      startAutoPlay()
    }
  }
  // Gestionnaires d'événements pour pause au survol
  function handleMouseEnter(): void {
    stopAutoPlay()
  }

  function handleMouseLeave(): void {
    if (!isPaused) {
      startAutoPlay()
    }
  }

  // Gestionnaire de clic sur les indicateurs
  function handleIndicatorClick(index: number): void {
    goToSlide(index)
    // Redémarrer le timer après un clic manuel
    if (!isPaused) {
      stopAutoPlay()
      startAutoPlay()
    }
  }

  onMount(() => {
    // Démarrer l'animation automatique au montage du composant
    startAutoPlay()
  })

  onDestroy(() => {
    // Nettoyer l'intervalle à la destruction du composant
    stopAutoPlay()
  })
</script>

{#if carouselContent.slides && carouselContent.slides.length !== 0}
  <div class="h-[90%]">
    <div
      class="carousel w-full h-full cursor-pause-circle"
      on:mouseenter="{handleMouseEnter}"
      on:mouseleave="{handleMouseLeave}"
      role="region"
      aria-label="Caroussel d'images"
    >
      {#each carouselContent.slides as slide, i}
        <div
          id="carousel-item{i}"
          class="carousel-item w-full h-full flex justify-center items-center"
          style="transition: opacity {TRANSITION_DURATION}ms ease-in-out;"
        >
          <div
            class="flex flex-col justify-center items-center xl:w-4/5 w-11/12 h-full
          bg-cover bg-no-repeat bg-center"
            style="background-image: url('images/carousel/{slide.background}');"
          >
            <div
              class="relative w-full h-full
            {slide.message && slide.message.length !== 0
                ? 'bg-opacity-80'
                : 'bg-opacity-0'}
            {slide.background && slide.background.length !== 0
                ? 'bg-coopmaths-canvas dark:bg-coopmathsdark-canvas'
                : 'bg-coopmaths-struct dark:bg-coopmathsdark-struct'}"
            >
              <div
                class="w-full h-full xl:p-20 lg:p-10 md:p-6 sm:p-4 p-3 flex flex-col justify-between items-start"
              >
                {#if slide.title && slide.title.length !== 0}
                  <h1
                    class="w-full h-[20%] flex flex-row justify-start pb-8 font-bold
             text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl
             {slide.background && slide.background.length !== 0
                      ? 'text-coopmaths-struct dark:text-coopmathsdark-struct'
                      : 'text-coopmaths-canvas-darkest dark:text-coopmathsdark-canvas-darkest'}"
                  >
                    {slide.title}
                  </h1>
                {/if}
                {#if slide.message && slide.message.length !== 0}
                  {#if slide.image && slide.image.length !== 0}
                    <div class="flex flex-row w-full h-[80%] gap-4">
                      <div
                        class="w-full lg:w-1/2 h-full flex justify-start items-center
                        overflow-hidden text-ellipsis
                 px-4 sm:px-6 md:px-8 lg:px-10 text-opacity-100 font-light
                 text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-4xl
                 {slide.background && slide.background.length !== 0
                          ? 'text-coopmaths-corpus dark:text-coopmathsdark-corpus'
                          : 'text-coopmaths-canvas dark:text-coopmathsdark-canvas'}"
                      >
                        {slide.message}
                      </div>
                      <div
                        class="hidden lg:flex lg:w-1/2 flex-1 justify-center items-center"
                      >
                        <!-- Support for both images and videos -->
                        {#if slide.image.endsWith('.mp4')}
                          <video
                            class="flex items-center justify-center w-full h-full object-scale-down"
                            src="images/carousel/{slide.image}"
                            autoplay
                            loop
                            muted
                            playsinline
                          ></video>
                        {:else}
                        <img
                          class="flex items-center justify-center w-full h-full object-scale-down"
                          src="images/carousel/{slide.image}"
                          alt="Image:{slide.image}"
                        />
                        {/if}
                      </div>
                    </div>
                  {:else}
                    <div
                      class="w-full h-[80%] flex justify-start items-center
                      overflow-hidden text-ellipsis
               px-4 sm:px-6 md:px-8 lg:px-10 text-opacity-100 font-light
               text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
               {slide.background && slide.background.length !== 0
                        ? 'text-coopmaths-corpus dark:text-coopmathsdark-corpus'
                        : 'text-coopmaths-canvas dark:text-coopmathsdark-canvas'}"
                    >
                      {slide.message}
                    </div>
                  {/if}
                {/if}
              </div>
              {#if slide.link && slide.link.length !== 0}
                <div class="absolute bottom-6 right-6">
                  <ButtonTextAction
                    text="{slide.buttonTitle && slide.buttonTitle.length !== 0
                      ? slide.buttonTitle
                      : 'En savoir plus'}"
                    class="inline-flex items-center py-1 px-3 rounded-md font-normal"
                    on:click="{() => {
                      const w = window.open(
                        slide.link || 'https://coopmaths.fr/alea/',
                        '_blank',
                      )
                      if (w) {
                        w.focus()
                      }
                    }}"
                  />
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
    <div class="flex w-full justify-center gap-2 py-2">
      {#each carouselContent.slides as slide, i}
        <button
          class="btn btn-xs border-0
            {i === currentSlideIndex
            ? 'bg-coopmaths-light text-coopmaths-canvas dark:bg-coopmathsdark-action dark:text-coopmathsdark-canvas-dark'
            : 'bg-coopmaths-canvas-darkest text-coopmaths dark:bg-coopmathsdark-canvas-dark dark:text-coopmathsdark-action'} font-light transition-all duration-200"
          on:click="{() => handleIndicatorClick(i)}"
          aria-label="Aller au slide {i + 1}"
        >
          {i + 1}
        </button>
      {/each}
    </div>
  </div>
{/if}
