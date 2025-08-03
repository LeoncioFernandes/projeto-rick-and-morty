import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import type { Character } from "../../../types/CharacterType";
import { instanceApiService } from "../../../services/InstanceApiService/InstanceApiService";
import type { Location } from "../../../types/LocationType";
import { PromisseAll } from "../../../services/PromiseAllService/PromiseAllService";
import IsLoadingElement from "../../../components/IsLoadingElement/IsLoadingElement";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import TitleSection from "../../../components/TitleSection/TitleSection";
import CardCharacter from "../../../components/CardCharacter/CardCharacter";

export default function LocalizacaoDetalhes() {
	const { id } = useParams<{ id: string }>();
	const [location, setLocation] = useState<Location | null>(null);
	const [characters, setCharacters] = useState<Character[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isLoading2, setIsLoading2] = useState<boolean>(true);

	async function getEpisode() {
		const response = await instanceApiService.get<Location>(`location/${id}`);
		setIsLoading(false);
		setLocation(response.data);
	}

	async function getCharacters() {
		if (location && location.residents.length > 0) {
			const response = await PromisseAll<Character>(location.residents);
			setIsLoading2(false);
			setCharacters(response);
		}
	}

	useEffect(() => {
		getEpisode();
	}, [id]);

	useEffect(() => {
		if (location) {
			getCharacters();
		}
	}, [location]);

	if (!location || isLoading) {
		return <IsLoadingElement />;
	}

	return (
		<div className="flex flex-col max-w-7xl w-full mx-auto">
			<NavLink
				to={`/localizacoes`}
				className="text-primary text-4xl mt-4 w-fit hover:bg-primary hover:text-white rounded-full transition"
			>
				<IoArrowBackCircleOutline />
			</NavLink>
			<TitleSection>Detalhes da Localização</TitleSection>

			{location && (
				<div className="flex grow flex-col gap-4">
					<div className="flex justify-center border border-tertiary-2 rounded-lg p-6">
						<div className="flex flex-col gap-4">
							<h2 className="text-4xl font-bold">{location.name}</h2>
							<div>
								<p>
									<span className="text-tertiary-3 font-bold mr-1">Tipo:</span>
									{location.type}
								</p>
								<p>
									<span className="text-tertiary-3 font-bold mr-1">
										Dimensão:
									</span>
									{location.dimension ? location.dimension : "unknown"}
								</p>
							</div>
						</div>
					</div>
					<div className="flex justify-center border border-tertiary-2 rounded-lg p-6 text-3xl font-semibold text-secondary">
						<p>Residentes</p>
					</div>
					{!characters && location.residents.length !== 0 && isLoading2 && (
						<IsLoadingElement />
					)}
					{location.residents.length === 0 && (
						<p className="text-center">Não existem Residentes.</p>
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
