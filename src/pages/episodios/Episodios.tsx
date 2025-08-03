import { useEffect, useState } from "react";
import type { InfoApi } from "../../types/InfoType";
import type { Episode } from "../../types/EpisodeType";
import { instanceApiService } from "../../services/InstanceApiService/InstanceApiService";
import TitleSection from "../../components/TitleSection/TitleSection";
import Paginacao from "../../components/Paginacao/Paginacao";
import CardEpisode from "../../components/CardEpisode/CardEpisode";
import IsLoadingElement from "../../components/IsLoadingElement/IsLoadingElement";

export default function Episodios() {
	const [episodes, setEpisodes] = useState<InfoApi<Episode[]> | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	function setFirstPage() {
		setCurrentPage(1);
	}
	function setLastPage(lastPage: number | undefined) {
		if (lastPage) setCurrentPage(lastPage);
	}
	function previousPage() {
		setCurrentPage((prev) => {
			if (prev === 1) return prev;
			return prev - 1;
		});
	}
	function nextPage(totalPages: number | undefined) {
		setCurrentPage((prev) => {
			if (prev === totalPages) return prev;
			return prev + 1;
		});
	}

	async function getAllCharacters() {
		setIsLoading(true);
		const response = await instanceApiService.get<InfoApi<Episode[]>>(
			`episode?page=${currentPage}`
		);
		setIsLoading(false);
		setEpisodes(response.data);
	}

	useEffect(() => {
		getAllCharacters();
	}, [currentPage]);

	if (!episodes || isLoading) {
		return <IsLoadingElement />;
	}

	return (
		<div className="flex flex-col max-w-7xl mx-auto">
			<TitleSection>Episódios</TitleSection>
			<Paginacao
				currentPage={currentPage}
				lastPage={episodes?.info.pages}
				setFirstPage={setFirstPage}
				setLastPage={setLastPage}
				previousPage={previousPage}
				nextPage={nextPage}
			/>
			<div className="flex justify-center flex-wrap gap-4">
				{episodes?.results.map((episode) => (
					<CardEpisode key={episode.id} {...episode} />
				))}
			</div>
			<Paginacao
				currentPage={currentPage}
				lastPage={episodes?.info.pages}
				setFirstPage={setFirstPage}
				setLastPage={setLastPage}
				previousPage={previousPage}
				nextPage={nextPage}
			/>
		</div>
	);
}
