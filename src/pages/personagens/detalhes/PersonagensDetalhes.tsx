import { useEffect, useState } from "react";
import type { Character } from "../../../types/CharacterType";
import { instanceApiService } from "../../../services/InstanceApiService/InstanceApiService";
import { NavLink, useParams } from "react-router";
import TitleSection from "../../../components/TitleSection/TitleSection";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import type { Episode } from "../../../types/EpisodeType";
import CardEpisode from "../../../components/CardEpisode/CardEpisode";
import { PromisseAll } from "../../../services/PromiseAllService/PromiseAllService";
import IsLoadingElement from "../../../components/IsLoadingElement/IsLoadingElement";

export default function PersonagemDetalhes() {
	const { id } = useParams<{ id: string }>();
	const [character, setCharacter] = useState<Character | null>(null);
	const [episodes, setEpisodes] = useState<Episode[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isLoading2, setIsLoading2] = useState<boolean>(true);

	async function getCharacter() {
		const response = await instanceApiService.get<Character>(`character/${id}`);
		setIsLoading(false);
		setCharacter(response.data);
	}

	async function getEpisodes() {
		if (character && character.episode.length > 0) {
			const response = await PromisseAll<Episode>(character.episode);
			setIsLoading2(false);
			setEpisodes(response);
		}
	}

	useEffect(() => {
		getCharacter();
	}, [id]);

	useEffect(() => {
		if (character) {
			getEpisodes();
		}
	}, [character]);

	if (!character || isLoading) {
		return <IsLoadingElement />;
	}

	return (
		<div className="flex flex-col max-w-7xl w-full mx-auto">
			<NavLink
				to={`/personagens`}
				className="text-primary text-4xl mt-4 w-fit hover:bg-primary hover:text-white rounded-full transition"
			>
				<IoArrowBackCircleOutline />
			</NavLink>
			<TitleSection>Detalhes do Personagem</TitleSection>

			{character && (
				<div className="flex flex-col grow gap-4">
					<div className="flex justify-center border border-tertiary-2 rounded-lg p-6">
						<div className="flex flex-col-reverse sm:flex-row gap-4 w-full max-w-4xl justify-between items-center">
							<div className="flex flex-col gap-4">
								<h2 className="text-4xl font-bold text-center sm:text-left">
									{character.name}
								</h2>
								<p
									className={twMerge(
										character.status === "Alive" && "text-green-500",
										character.status === "Dead" && "text-red-500",
										"text-4xl font-bold"
									)}
								>
									Status: {character.status}
								</p>
								<p>
									<span className="text-tertiary-3 font-bold mr-1">
										Espécie:
									</span>
									{character.species}
								</p>
								<p>
									<span className="text-tertiary-3 font-bold mr-1">
										Origem:
									</span>
									{character.origin.name}
								</p>
								<p>
									<span className="text-tertiary-3 font-bold mr-1">
										Última localização:
									</span>
									{character.location.name}
								</p>
							</div>
							<img
								src={character?.image}
								alt={character.name}
								className="w-60 md:w-75 h-60 md:h-75"
							/>
						</div>
					</div>
					<div className="flex justify-center border border-tertiary-2 rounded-lg p-6 text-2xl font-bold">
						<p>{character.name} aparece nos seguintes episódios:</p>
					</div>
					{!episodes && character.episode.length !== 0 && isLoading2 && (
						<IsLoadingElement />
					)}
					{character.episode.length === 0 && (
						<p className="text-center">Não existem Episódios.</p>
					)}
					{episodes && (
						<div className="flex justify-center flex-wrap gap-4">
							{episodes.map((episode) => (
								<CardEpisode key={episode.id} {...episode} />
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
