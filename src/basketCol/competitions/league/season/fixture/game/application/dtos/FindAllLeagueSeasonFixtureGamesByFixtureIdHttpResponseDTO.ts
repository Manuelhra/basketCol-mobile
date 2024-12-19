export interface FindAllLeagueSeasonFixtureGamesByFixtureIdHttpResponseDTO {
  leagueSeasonFixtureGames: LeagueSeasonFixtureGame[]
}

interface LeagueSeasonFixtureGame {
  id: string
  startTime: string
  endTime: any
  homeTeamId: string
  awayTeamId: string
  homeScore: number
  awayScore: number
  gameType: string
  gameDuration: GameDuration
  quarter: any
  overtime: boolean
  overtimeNumber: any
  gameStatus: string
  headRefereeId: string
  assistantRefereeId: string
  courtId: string
  fixtureId: string
  createdAt: string
  updatedAt: string
  homeTeam: HomeTeam
  awayTeam: AwayTeam
}

interface GameDuration {
  value: number
  unit: string
}

interface HomeTeam {
  id: string
  officialName: string
  gender: string
  logo: Logo
  mainImage: MainImage
  gallery: Gallery
  teamFounderUserId: string
  createdAt: string
  updatedAt: string
}

interface Logo {
  url: string
  alt: string
  uploadedAt: string
  dimensions: Dimensions
}

interface Dimensions {
  width: number
  height: number
}

interface MainImage {
  url: string
  alt: string
  uploadedAt: string
  dimensions: Dimensions2
}

interface Dimensions2 {
  width: number
  height: number
}

interface Gallery {
  images: Image[]
}

interface Image {
  url: string
  uploadedAt: string
  alt: string
  dimensions: Dimensions3
}

interface Dimensions3 {
  width: number
  height: number
}

interface AwayTeam {
  id: string
  officialName: string
  gender: string
  logo: Logo2
  mainImage: MainImage2
  gallery: Gallery2
  teamFounderUserId: string
  createdAt: string
  updatedAt: string
}

interface Logo2 {
  url: string
  alt: string
  uploadedAt: string
  dimensions: Dimensions4
}

interface Dimensions4 {
  width: number
  height: number
}

interface MainImage2 {
  url: string
  alt: string
  uploadedAt: string
  dimensions: Dimensions5
}

interface Dimensions5 {
  width: number
  height: number
}

interface Gallery2 {
  images: Image2[]
}

interface Image2 {
  url: string
  uploadedAt: string
  alt: string
  dimensions: Dimensions6
}

interface Dimensions6 {
  width: number
  height: number
}
