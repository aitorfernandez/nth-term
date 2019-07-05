export function sketch(p) {
  // http://localhost:3003/?number=1001

  const url = new URL(window.location.href)
  const number = url.searchParams.get('number') / 5 || 1001 / 5

  const SIZE = 36
   // window.innerWidth
  const WIDTH = 720 + SIZE

  // sequence for 1, 3, 7, 13, 21, 31, 43...
  const d1 = []

  for (let i = 1; i < number; i += 1) {
    const n = i * (i - 1) + 1
    if (n > number) {
      break
    }
    d1.push(n)
  }

  // sequence for 1, 5, 9, 17, 25, 37, 49...
  const d2 = []

  for (let i = 0; i < number; i += 2) {
    const n = Math.pow(i, 2) + 1
    if (n > number) {
      break
    }
    d2.push(n)
  }

  for (let i = 1; i < number / 2; i += 1) {
    const n = Math.pow((2 * i) + 1, 2)
    if (n > number / 2) {
      break
    }

    d2.push(n)
  }

  d2.sort((a, b) => a - b).shift()

  const merge = [
    ...d1, ...d2
  ].sort((a, b) => a - b)

  console.log(
    merge.reduce((a, b) => a + b, 0)
  )

  console.log(merge);



  p.setup = () => {
    p.createCanvas(WIDTH, WIDTH, p.P2D)
    p.frameRate(12)
  }

  p.draw = () => {
    p.background(255)

    p.stroke(0, 0, 0)
    p.strokeWeight(1)

    function isOdd(n) {
      return n % 2
    }

    function drawRect(x, y, value) {
      p.rect(x, y, SIZE, SIZE)
      p.text(value, x, y)
    }

    const center = ((WIDTH - SIZE) / SIZE) / 2

    let oddCounter = 1
    let evenCounter = 1

    // drawRect(center * SIZE, center * SIZE, d1[0])

    function resolveStPositions(value, i) {
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

        drawRect(x, y, value)
      }
    }

    function resolveNdPositions(value, i) {
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

        drawRect(x, y, value)
      }
    }

    // d1.forEach(resolveStPositions)

    // oddCounter = 1
    // evenCounter = 1

    // d2.forEach(resolveNdPositions)
  }

  p.windowResized = () => {
    p.resizeCanvas(WIDTH, WIDTH)
  }
}
