import { useEffect, useState } from "react";
import type { InfoApi } from "../../types/InfoType";
import type { Location } from "../../types/LocationType";
import { instanceApiService } from "../../services/InstanceApiService/InstanceApiService";
import IsLoadingElement from "../../components/IsLoadingElement/IsLoadingElement";
import TitleSection from "../../components/TitleSection/TitleSection";
import Paginacao from "../../components/Paginacao/Paginacao";
import CardLocation from "../../components/CardLocation/CardLocation";

export default function Localizacoes() {
	const [locations, setLocations] = useState<InfoApi<Location[]> | null>(null);
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
		const response = await instanceApiService.get<InfoApi<Location[]>>(
			`location?page=${currentPage}`
		);
		setIsLoading(false);
		setLocations(response.data);
	}

	useEffect(() => {
		getAllCharacters();
	}, [currentPage]);

	if (!locations || isLoading) {
		return <IsLoadingElement />;
	}

	return (
		<div className="flex flex-col max-w-7xl mx-auto">
			<TitleSection>Localizações</TitleSection>
			<Paginacao
				currentPage={currentPage}
				lastPage={locations?.info.pages}
				setFirstPage={setFirstPage}
				setLastPage={setLastPage}
				previousPage={previousPage}
				nextPage={nextPage}
			/>
			<div className="flex justify-center flex-wrap gap-4">
				{locations?.results.map((location) => (
					<CardLocation key={location.id} {...location} />
				))}
			</div>
			<Paginacao
				currentPage={currentPage}
				lastPage={locations?.info.pages}
				setFirstPage={setFirstPage}
				setLastPage={setLastPage}
				previousPage={previousPage}
				nextPage={nextPage}
			/>
		</div>
	);
}
