// components/RandomImage.tsx
import Image from 'next/image'

const images = [
    { img: '/images/cube.png', width: 609, height: 628, alt: 'Cube artwork' },
    { img: '/images/day-dinner.png', width: 614, height: 769, alt: 'Day dinner scene' },
    { img: '/images/night.png', width: 640, height: 457, alt: 'Night scene' },
    { img: '/images/day.png', width: 617, height: 550, alt: 'Day scene' },
    { img: '/images/uni.png', width: 640, height: 395, alt: 'University scene' }
]

export function RandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length)
    const selectedImage = images[randomIndex]

    return (
        <div className="random-image-container">
            <Image
                src={selectedImage.img}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                priority
                className="random-image"
            />
        </div>
    )
}
