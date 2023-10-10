(function(){
    const $slides = $('[data-slide]')
    const $slidesArray = $slides.toArray()
    const $slidesToggleUpButton = $('[data-slide-toggle="up"]')
    const $slidesToggleDownButton = $('[data-slide-toggle="down"]')
    // const $slidesToggleDownButton = $('[data-form-inner="btn"]')
    const $slidesInnerFields = $('[data-form-inner="input"]')

    function ifAllItemsTrue(arr) {
        return arr.every(element => element === true);
    }

    function slidePositionSet(){
        let $activeSlide = $('[data-slide].active').get(0)
        let $activeSlideIndex = $slidesArray.indexOf($activeSlide)

        let prevPosition
        let nextPosition

        if($activeSlideIndex == 0){
            // prevPosition = $slidesArray[$slidesArray.length - 1];
            prevPosition = $slidesArray[0];
        }else{
            prevPosition = $slidesArray[$activeSlideIndex - 1];
        }
    
        if($activeSlideIndex == $slidesArray.length - 1){
            // nextPosition = $slidesArray[0];
            nextPosition = $slidesArray[$slidesArray.length - 1];
        }else{
            nextPosition = $slidesArray[$activeSlideIndex + 1];
        }
    
        return[prevPosition, nextPosition];
    }

    function slidePositionUpdate(){
        let $activeSlide = $('[data-slide].active').get(0)
        let $activeSlideIndex = $slidesArray.indexOf($activeSlide)
        $slidesArray.map(function(eachItem, eachIndex){
            if(eachIndex === $activeSlideIndex){
                $(eachItem).addClass('active')
                $(eachItem).css('--slide-index', 0)
                $(eachItem).attr('data-slide-index', 0)
            }
            else if(eachIndex > $activeSlideIndex){
                $(eachItem).removeClass('active')
                // $(eachItem).css('--slide-index', eachIndex - $activeSlideIndex)
                // $(eachItem).attr('data-slide-index', eachIndex - $activeSlideIndex)
                $(eachItem).css('--slide-index', 1)
                $(eachItem).attr('data-slide-index', 1)
            }
            else{
                $(eachItem).removeClass('active')
                $(eachItem).css('--slide-index', -1)
                $(eachItem).attr('data-slide-index', -1)
            }
        })

        if($activeSlideIndex == 0){
            $slidesToggleUpButton.prop('disabled', true)
        }else{
            $slidesToggleUpButton.removeAttr('disabled')
        }
    }

    function calculateVerticalHeight(){
        var vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', vh + 'px')
    }

    function checkCurrentFormFieldsValidOrNot(){
        $('[data-form="inner"]').each(function(){
            let $currentSlidesInnerFields = $(this).find('[data-form-inner="input"]')
            let currentSlidesInnerFieldsArray = []
            $currentSlidesInnerFields.each(function(inputsIndex, inputsItem){
                currentSlidesInnerFieldsArray.push(inputsItem.checkValidity())
            })
            if(ifAllItemsTrue(currentSlidesInnerFieldsArray)){
                $slidesToggleDownButton.removeAttr('disabled')
            }else{
                $slidesToggleDownButton.prop('disabled', true)
            }

            console.log(currentSlidesInnerFieldsArray);
        }) 
    }

    function checkCurrentFormFieldsValidOrNotOnInput(){
        $('[data-form="inner"]').each(function(){
            let $currentSlidesInnerFields = $(this).find('[data-form-inner="input"]')
            $currentSlidesInnerFields.on('input', function(){
                let currentSlidesInnerFieldsArray = []
                $currentSlidesInnerFields.each(function(inputsIndex, inputsItem){
                    currentSlidesInnerFieldsArray.push(inputsItem.checkValidity())
                })
                if(ifAllItemsTrue(currentSlidesInnerFieldsArray)){
                    $slidesToggleDownButton.removeAttr('disabled')
                }else{
                    $slidesToggleDownButton.prop('disabled', true)
                }
            })
        })
    }

    $(window).on('resize', function(){
        calculateVerticalHeight();
    })

    $(document).ready(function () {
        calculateVerticalHeight()
        slidePositionUpdate()
        checkCurrentFormFieldsValidOrNot()
        checkCurrentFormFieldsValidOrNotOnInput()
        $slidesToggleUpButton.on("click", function(){
            let $activeSlide = $('[data-slide].active')
            let [prevPosition, nextPosition] = slidePositionSet()
            $activeSlide.removeClass("active")
            $(prevPosition).addClass("active")
            slidePositionUpdate()
            checkCurrentFormFieldsValidOrNot()
        })
        $slidesToggleDownButton.on("click", function(){
            let $activeSlide = $('[data-slide].active')
            let [prevPosition, nextPosition] = slidePositionSet()
            $activeSlide.removeClass("active")
            $(nextPosition).addClass("active")
            slidePositionUpdate()

            // let $currentSlidesInnerFields = $(this).closest('[data-form="inner"]').find('[data-form-inner="input"]')
            // let currentSlidesInnerFieldsArray = []
            // $currentSlidesInnerFields.each(function(inputsIndex, inputsItem){
            //     currentSlidesInnerFieldsArray.push(inputsItem.checkValidity())
            // })
            // if(ifAllItemsTrue(currentSlidesInnerFieldsArray)){
            //     $(this).removeAttr('disabled')
            // }else{
            //     $(this).prop('disabled', true)
            // }

            checkCurrentFormFieldsValidOrNot()
        })
        
    });
})()