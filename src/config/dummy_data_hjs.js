export const _dummy_PetVaccinationObject = {
	_id: 'petVaccina1',
	vaccination_pet_id: 'pet1', //접종 대상 반려동물

	vaccination_heartworm: {
		last_vaccination_date: '2021.01.12', //최종 접종일
		nearest_vaccination_date: '2021.03.06', //가장빠른 접종 예정일
		next_vaccination_date: '2022.01.11', //다음 접종 예정일
		is_vaccinated: true, //접종여부
	}, //심장사상충

	vaccination_ectozoon: {
		last_vaccination_date: '2019.07.07',
		nearest_vaccination_date: '2020.08.23',
		next_vaccination_date: '2018.02.11',
		is_vaccinated: true,
	}, //외부 기생충

	vaccination_anthelmintic: {
		last_vaccination_date: '2013.09.18',
		nearest_vaccination_date: '2017.12.11',
		next_vaccination_date: '2022.09.30',
		is_vaccinated: true,
	}, //구충제

	vaccination_comprehensive: {
		last_vaccination_date: '2019.02.15',
		nearest_vaccination_date: '2022.10.09',
		next_vaccination_date: '2023.04.12',
		is_vaccinated: true,
	}, //종합접종

	vaccination_coronaviral_enteritis: {
		last_vaccination_date: '2020.03.21',
		nearest_vaccination_date: '2022.09.16',
		next_vaccination_date: '2022.04.17',
		is_vaccinated: true,
	}, //코로나 장염

	vaccination_bronchitis: {
		last_vaccination_date: '2016.04.18',
		nearest_vaccination_date: '2024.06.25',
		next_vaccination_date: '2022.03.02',
		is_vaccinated: true,
	}, //기관지염

	vaccination_hydrophobia: {
		last_vaccination_date: '2020.02.17',
		nearest_vaccination_date: '2021.06.22',
		next_vaccination_date: '2023.07.23',
		is_vaccinated: true,
	}, //광견병

	vaccination_influenza: {
		last_vaccination_date: '2020.03.27',
		nearest_vaccination_date: '2022.03.01',
		next_vaccination_date: '2023.12.21',
		is_vaccinated: true,
	}, //인플루엔자
};
