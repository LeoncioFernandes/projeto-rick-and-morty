import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import type { Episode } from "../../../types/EpisodeType";
import { instanceApiService } from "../../../services/InstanceApiService/InstanceApiService";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import TitleSection from "../../../components/TitleSection/TitleSection";
import CardCharacter from "../../../components/CardCharacter/CardCharacter";
import type { Character } from "../../../types/CharacterType";
import { PromisseAll } from "../../../services/PromiseAllService/PromiseAllService";
import IsLoadingElement from "../../../components/IsLoadingElement/IsLoadingElement";

export default function EpisodioDetalhes() {
	const { id } = useParams<{ id: string }>();
	const [episode, setEpisode] = useState<Episode | null>(null);
	const [characters, setCharacters] = useState<Character[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isLoading2, setIsLoading2] = useState<boolean>(true);

	async function getEpisode() {
		const response = await instanceApiService.get<Episode>(`episode/${id}`);
		setIsLoading(false);
		setEpisode(response.data);
	}

	async function getCharacters() {
		if (episode && episode.characters.length > 0) {
			const response = await PromisseAll<Character>(episode.characters);
			setIsLoading2(false);
			setCharacters(response);
		}
	}

	useEffect(() => {
		getEpisode();
	}, [id]);

	useEffect(() => {
		if (episode) {
			getCharacters();
		}
	}, [episode]);

	if (!episode || isLoading) {
		return <IsLoadingElement />;
	}

	return (
		<div className="flex flex-col max-w-7xl w-full mx-auto">
			<NavLink
				to={`/episodios`}
				className="text-primary text-4xl mt-4 w-fit hover:bg-primary hover:text-white rounded-full transition"
			>
				<IoArrowBackCircleOutline />
			</NavLink>
			<TitleSection>Detalhes do Episódio</TitleSection>

			{episode && (
				<div className="flex grow flex-col gap-4">
					<div className="flex justify-center border border-tertiary-2 rounded-lg p-6">
						<div className="flex flex-col gap-4">
							<h2 className="text-4xl font-bold">{episode.name}</h2>
							<div>
								<p>
									<span className="text-tertiary-3 font-bold mr-1">
										Temporada:
									</span>
									{episode.episode}
								</p>
								<p>
									<span className="text-tertiary-3 font-bold mr-1">
										Data de Exibição:
									</span>
									{episode.air_date}
								</p>
							</div>
						</div>
					</div>
					<div className="flex justify-center border border-tertiary-2 rounded-lg p-6 text-3xl font-semibold text-secondary">
						<p>Personagens</p>
					</div>
					{!characters && episode.characters.length !== 0 && isLoading2 && (
						<IsLoadingElement />
					)}
					{episode.characters.length === 0 && (
						<p className="text-center">Não existem Personagens.</p>
					)}
					{characters && (
						<div className="flex justify-center flex-wrap gap-4">
							{characters.map((character) => (
								<CardCharacter key={character.id} {...character} />
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
