;(function flexible(window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize()

  function setRemUnit() {
    var rem = docEl.clientWidth / 10
    if (docEl.clientWidth >= 1024) {
      docEl.style.fontSize = '60px'
      return
    }
    docEl.style.fontSize = rem + 'px'
    var computedSize = window
      .getComputedStyle(document.querySelector('html'))
      .fontSize.split('px')[0]
    if (rem !== computedSize) {
      docEl.style.fontSize = (rem * rem) / computedSize + 'px'
    }
  }

  setRemUnit()

  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function(e) {
    if (e.persisted || (window.performance && window.performance.navigation.type === 2)) {
      setTimeout(function() {
        setRemUnit()
      }, 0)
    }
  })

  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
})(window, document)