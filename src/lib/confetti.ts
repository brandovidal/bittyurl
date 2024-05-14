import JSConfetti from 'js-confetti'

export async function generateConfetti () {
  const jsConfetti = new JSConfetti()
  await jsConfetti.addConfetti({
    confettiColors: ['#fdd835', '#4caf50', '#2196f3', '#f44336', '#ff9800'],
    confettiRadius: 3,
    confettiNumber: 50
  })
}
