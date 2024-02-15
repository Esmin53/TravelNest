import {Star, StarHalf } from "lucide-react"

const Ratings = ({avgRating, count}: {avgRating: number, count: number}) => {
    const fullStars = Math.floor(avgRating);
  const hasHalfStar = avgRating % 1 !== 0;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star className="text-yellow-400" key={`star-${i}`} />);
  }

  if (hasHalfStar) {
    stars.push(<StarHalf className="text-yellow-400"  key="half-star" />);
  }

    return (
        <div className="flex gap-1 items-center">
            {stars}
            <p className="text-2xl font-semibold">{avgRating}</p>
            <p className="text-gray-600 h-full flex flex-col items-end justify-end">{count} review{count !== 1 && 's'}</p>
        </div>
    )
}

export default Ratings