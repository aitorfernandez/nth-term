import randomColor from 'randomcolor'

export function sketch(p) {
  // http://localhost:3003/?spiral=5

  const url = new URL(window.location.href)
  const spiral = (Number(url.searchParams.get('spiral')) || 12) + 1

  const SIZE = 36
  const WIDTH = 720 + SIZE

  // sequence for 1, 3, 7, 13, 21, 31, 43...
  let d1 = []

  for (let i = 1; i < spiral; i += 1) {
    const n = i * (i - 1) + 1
    d1.push(n)
  }

  console.log('d1', d1)

  // sequence for 1, 5, 9, 17, 25, 37, 49...
  let d2 = []

  for (let i = 0; i < spiral; i += 2) {
    let n = Math.pow(i, 2) + 1
    d2.push(n)
  }

  for (
    let i = 1, len = spiral - d2.length; i < len; i += 1
  ) {
    const n = Math.pow((2 * i) + 1, 2)
    d2.push(n)
  }

  console.log('d2', d2)

  const sum = [
    ...d1,
    ...(d2.sort((a, b) => a - b))
  ].reduce((a, b) => a + b, 0)

  console.log('sum', sum - 1)

  const c1 = randomColor({ count: d1.length })
  const c2 = randomColor({ count: d2.length })

  p.setup = () => {
    p.createCanvas(WIDTH, WIDTH, p.P2D)
    p.frameRate(12)
  }

  p.draw = () => {
    p.background(255)

    p.textSize(12)
    p.textAlign(p.CENTER)

    p.noStroke()

    function isOdd(n) {
      return n % 2
    }

    function drawRect(x, y, value) {
      p.rect(x, y, SIZE, SIZE)
      p.fill(255, 255, 255)
      p.text(value, x + (SIZE / 2), y + (SIZE / 2) + 4)
    }

    const center = ((WIDTH - SIZE) / SIZE) / 2

    let oddCounter = 1
    let evenCounter = 1

    p.fill(c1[0])
    drawRect(center * SIZE, center * SIZE, d1[0])

    function drawStSequence(value, i) {
      if (i > 0) {
        let x, y

        if (isOdd(i)) {
          // 1, 3, 13...
          x = y = (center + oddCounter) * SIZE
          oddCounter += 1
        } else {
          // 1, 7, 21...
          x = y = (center - evenCounter) * SIZE
          evenCounter += 1
        }

        p.fill(c1[i])
        drawRect(x, y, value)
      }
    }

    function drawNdSequence(value, i) {
      if (i > 0) {
        let x, y

        if (isOdd(i)) {
          // 5, 17, 37...
          x = (center - oddCounter) * SIZE
          y = (center + oddCounter) * SIZE
          oddCounter += 1
        } else {
          x = (center + evenCounter) * SIZE
          y = (center - evenCounter) * SIZE
          evenCounter += 1
        }

        p.fill(c2[i])
        drawRect(x, y, value)
      }
    }

    d1.forEach(drawStSequence)

    oddCounter = 1
    evenCounter = 1

    d2.forEach(drawNdSequence)
  }

  p.windowResized = () => {
    // window.innerWidth
    p.resizeCanvas(WIDTH, WIDTH)
  }
}
