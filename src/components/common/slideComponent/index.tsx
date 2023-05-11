import { CourseType } from '../../../services/courseService';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import SlideCard from '../slideCard';

interface props {
    course: CourseType[];
}

const SlideComponent = function ({ course }: props) {
        return (
        <>
            <div className='d-flex flex-column align-items-center py-4'>
            <Splide
                options={{
                type: "loop",
                perPage: 4,
                perMove: 1,
                width: 1200,
                pagination: false,
                }}>

                {course?.map((course) => 
                    (<SplideSlide key={course.id}>
                        <SlideCard course={course} />
                    </SplideSlide>)
                )}
            </Splide>
            </div>
        </>
        );
    };
    
export default SlideComponent;

