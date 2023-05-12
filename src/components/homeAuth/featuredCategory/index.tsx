import styles from '../../../../styles/slideCategory.module.scss';
import useSWR from 'swr';
import courseService, { CourseType } from '@/services/courseService';
import SlideComponent from '@/components/common/slideComponent';

const FeaturedCategory = function () {

    const {data, error} = useSWR('/featured', courseService.getFeaturedCourses)

    if(error) return error
    if(!data) return(<><p>Loading data...</p></>)

    return (
            <>
                <p className={styles.titleCategory}>EM DESTAQUE NO VERITAS</p>
                <SlideComponent course={data.data}/>
            </>
    )
};

export default FeaturedCategory