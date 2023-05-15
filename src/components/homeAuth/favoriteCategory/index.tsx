import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from 'swr';
import courseService, { CourseType } from '@/services/courseService';
import SlideComponent from "@/components/common/slideComponent";
import PageSpinner from "@/components/common/spinner";

const FavoritesCategory = function () {
    const {data, error} = useSWR('/favorites', courseService.getFavoriteCourses)

    if(error) return error
    if(!data) return <PageSpinner/>

    return (
            <>
                <p className={styles.titleCategory}>Minha Lista</p>
                {data.data.courses.length > 0 ? (
                    <SlideComponent course={data.data.courses}/>
                ) : (
                    <p className="text-center pt-3 h5">
                        <strong>Você ainda não tem nenhum curso favoritado...</strong>
                    </p>
                )}
            </>
    );
};

export default FavoritesCategory;