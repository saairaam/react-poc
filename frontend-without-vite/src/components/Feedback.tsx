import { useEffect, useState } from 'react';
import './Styles/StarRating.css';
import { PiStarBold } from 'react-icons/pi';
import { useForm } from 'react-hook-form';

const Rating = ({ setComponent }: any) => {
  const [rating, setRating] = useState<number>(3);
  const { setValue } = useForm({
    defaultValues: {
      rating: 0,
      feedback: '',
    },
  });
  const ratingHandler = (index: number) => {
    setRating(index + 1);
    setValue('rating', index + 1);
  };
  const RatingMap: any = {
    '1': 'Worse',
    '2': 'Okayish',
    '3': 'Average',
    '4': 'Good',
    '5': 'Best',
  };
  return (
    <div className="flex flex-col justify-center p-3 gap-3 border">
      Please give you rating below
      <div className="flex flex-row  justify-center items-center  gap-3">
        {[...Array(5)].map((_element, index) => {
          const isFilled = index < rating;
          return (
            <div key={index} onClick={() => ratingHandler(index)}>
              <PiStarBold
                color={isFilled ? '#FBBF24' : undefined}
                // fontWeight={isFilled ? "Fill" : undefined}
                key={index}
              />
            </div>
          );
        })}
        <span>{RatingMap[rating]}</span>
      </div>
      <button
        className="flex justify-center bg-black rounded-xl"
        onClick={() => {
          setComponent(<ThankYou />);
        }}
      >
        <p>Submit</p>
      </button>
    </div>
  );
};
const ThankYou = () => {
  return <div>Thank you for submitting the feedback</div>;
};
export const Feedback = () => {
  const [Component, setComponent] = useState<JSX.Element | null>(null);
  useEffect(() => {
    setComponent(<Rating setComponent={setComponent} />);
    console.log();
  }, []);

  return <div className="flex flex-col justify-center items-center">{Component}</div>;
};
