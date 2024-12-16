/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Assessments = "Assessments",
	Brigades = "Brigades",
	Incidents = "Incidents",
	Victims = "Victims",
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Rittenstaat = "rittenstaat",
	Units = "units",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum AssessmentsDisabilityOptions {
	"Alert" = "Alert",
	"Verbaal" = "Verbaal",
	"Pain" = "Pain",
	"Unresponsive" = "Unresponsive",
}
export type AssessmentsRecord = {
	AdditionalNotes?: HTMLString
	AirwayClear?: boolean
	BloodOxygenLevel?: number
	BreathingFrequency?: number
	Disability?: AssessmentsDisabilityOptions
	Exposure?: HTMLString
	HeartRate?: number
	Victim?: RecordIdString
	created?: IsoDateString
	id: string
	updated?: IsoDateString
}

export type BrigadesRecord = {
	Areas: string
	created?: IsoDateString
	fullname?: string
	id: string
	location?: string
	number: number
	shortcode?: string
	updated?: IsoDateString
}

export enum IncidentsIncidentTypeOptions {
	"EHBO" = "EHBO",
	"Vermissing" = "Vermissing",
	"Overig" = "Overig",
}

export enum IncidentsStatusOptions {
	"Actief" = "Actief",
	"Afgerond" = "Afgerond",
}
export type IncidentsRecord = {
	Area?: string
	Brigade?: RecordIdString
	IncidentType?: IncidentsIncidentTypeOptions
	Location?: string
	Melding?: string
	Notepad?: string
	OGS?: boolean
	Priority?: number
	Status?: IncidentsStatusOptions
	Units?: RecordIdString[]
	VictimCount?: number
	created?: IsoDateString
	id: string
	updated?: IsoDateString
}

export enum VictimsVictimTypeOptions {
	"EHBO" = "EHBO",
	"Vermist persoon" = "Vermist persoon",
}

export enum VictimsGenderOptions {
	"Man" = "Man",
	"Vrouw" = "Vrouw",
	"Anders" = "Anders",
	"Onbekend" = "Onbekend",
}
export type VictimsRecord = {
	Age?: number
	ContactInfo?: HTMLString
	Description?: HTMLString
	FirstName?: string
	Found?: boolean
	Gender?: VictimsGenderOptions
	IncidentID?: RecordIdString
	LastName?: string
	MedicalDetails?: HTMLString
	Notes?: HTMLString
	VictimType?: VictimsVictimTypeOptions
	created?: IsoDateString
	id: string
	updated?: IsoDateString
}

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export enum RittenstaatActiviteitOptions {
	Strandbewaking = "Strandbewaking",
	Incident = "Incident",
	Anders = "Anders",
}
export type RittenstaatRecord<Taankomstadres = unknown, Tvertrekadres = unknown> = {
	aankomstadres?: null | Taankomstadres
	activiteit?: RittenstaatActiviteitOptions
	begin_km?: number
	chauffeur?: string
	created?: IsoDateString
	eind_km?: number
	gekoppeldIncident?: RecordIdString
	id: string
	totaal_km?: number
	updated?: IsoDateString
	vertrekadres?: null | Tvertrekadres
	voertuig?: RecordIdString
}

export enum UnitsTypeOptions {
	"post" = "post",
	"voertuig" = "voertuig",
	"vaartuig" = "vaartuig",
	"overig" = "overig",
}
export type UnitsRecord = {
	brigadeID?: RecordIdString
	created?: IsoDateString
	id: string
	name?: string
	type: UnitsTypeOptions
	unitnumber?: number
	updated?: IsoDateString
}

export enum UsersRoleOptions {
	"Admin" = "Admin",
	"BrigadeAdmin" = "BrigadeAdmin",
	"Commandant" = "Commandant",
	"Eenheid" = "Eenheid",
	"Lid" = "Lid",
}
export type UsersRecord = {
	brigade?: RecordIdString[]
	created?: IsoDateString
	email?: string
	emailVisibility?: boolean
	id: string
	password: string
	role: UsersRoleOptions
	tokenKey: string
	unit_id?: RecordIdString[]
	updated?: IsoDateString
	username: string
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AssessmentsResponse<Texpand = unknown> = Required<AssessmentsRecord> & BaseSystemFields<Texpand>
export type BrigadesResponse<Texpand = unknown> = Required<BrigadesRecord> & BaseSystemFields<Texpand>
export type IncidentsResponse<Texpand = unknown> = Required<IncidentsRecord> & BaseSystemFields<Texpand>
export type VictimsResponse<Texpand = unknown> = Required<VictimsRecord> & BaseSystemFields<Texpand>
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type RittenstaatResponse<Taankomstadres = unknown, Tvertrekadres = unknown, Texpand = unknown> = Required<RittenstaatRecord<Taankomstadres, Tvertrekadres>> & BaseSystemFields<Texpand>
export type UnitsResponse<Texpand = unknown> = Required<UnitsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	Assessments: AssessmentsRecord
	Brigades: BrigadesRecord
	Incidents: IncidentsRecord
	Victims: VictimsRecord
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	rittenstaat: RittenstaatRecord
	units: UnitsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	Assessments: AssessmentsResponse
	Brigades: BrigadesResponse
	Incidents: IncidentsResponse
	Victims: VictimsResponse
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	rittenstaat: RittenstaatResponse
	units: UnitsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'Assessments'): RecordService<AssessmentsResponse>
	collection(idOrName: 'Brigades'): RecordService<BrigadesResponse>
	collection(idOrName: 'Incidents'): RecordService<IncidentsResponse>
	collection(idOrName: 'Victims'): RecordService<VictimsResponse>
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'rittenstaat'): RecordService<RittenstaatResponse>
	collection(idOrName: 'units'): RecordService<UnitsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
