import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { api } from "../services/api";

export type Repository = {
	full_name: string;
	description: string;
};

export function Repos() {
	const { data, isFetching, error } = useQuery<Repository[]>(
		"repos",
		async () => {
			const response = await api.get("/users/renensk/repos");
			return response.data;
		},
		{ staleTime: 10000 * 60 }
	);

	if (error) {
		console.error(error);
		return <div>Error!</div>;
	}

	return (
		<ul>
			{isFetching && <p>Carregando...</p>}
			{data?.map((repo) => {
				return (
					<li key={repo.full_name}>
						<Link to={`repos/${repo.full_name}`}>{repo.full_name}</Link>
						<p>{repo.description}</p>
					</li>
				);
			})}
		</ul>
	);
}
