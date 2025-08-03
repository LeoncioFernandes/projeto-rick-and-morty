import { useEffect, useState } from "react";
import CardCharacter from "../../components/CardCharacter/CardCharacter";
import TitleSection from "../../components/TitleSection/TitleSection";
import type { InfoApi } from "../../types/InfoType";
import type { Character } from "../../types/CharacterType";
import { instanceApiService } from "../../services/InstanceApiService/InstanceApiService";
import Paginacao from "../../components/Paginacao/Paginacao";
import IsLoadingElement from "../../components/IsLoadingElement/IsLoadingElement";

export default function Personagens() {
	const [characters, setCharacters] = useState<InfoApi<Character[]> | null>(
		null
	);
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
		const response = await instanceApiService.get<InfoApi<Character[]>>(
			`character?page=${currentPage}`
		);
		setIsLoading(false);
		setCharacters(response.data);
	}

	useEffect(() => {
		getAllCharacters();
	}, [currentPage]);

	if (!characters || isLoading) {
		return <IsLoadingElement />;
	}

	return (
		<div className="flex flex-col max-w-7xl mx-auto">
			<TitleSection>Personagens</TitleSection>
			<Paginacao
				currentPage={currentPage}
				lastPage={characters?.info.pages}
				setFirstPage={setFirstPage}
				setLastPage={setLastPage}
				previousPage={previousPage}
				nextPage={nextPage}
			/>
			<div className="flex justify-center flex-wrap gap-4">
				{characters?.results.map((character) => (
					<CardCharacter key={character.id} {...character} />
				))}
			</div>
			<Paginacao
				currentPage={currentPage}
				lastPage={characters?.info.pages}
				setFirstPage={setFirstPage}
				setLastPage={setLastPage}
				previousPage={previousPage}
				nextPage={nextPage}
			/>
		</div>
	);
}
