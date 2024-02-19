import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
	const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
	const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

	return (
		<Carousel
			title={title}
			data={data?.results}
			loading={loading}
			endPoint={mediaType}
		/>
	);
};

export default Similar;
