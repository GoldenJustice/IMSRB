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
	created: IsoDateString
	updated: IsoDateString
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
}

export type BrigadesRecord = {
	fullname?: string
	location?: string
	number: number
	shortcode?: string
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
	Notepad?: HTMLString
	OGS?: boolean
	Priority?: number
	Status?: IncidentsStatusOptions
	Units?: RecordIdString[]
	VictimCount?: number
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
}

export enum UnitsTypeOptions {
	"post" = "post",
	"voertuig" = "voertuig",
	"vaartuig" = "vaartuig",
	"overig" = "overig",
}
export type UnitsRecord = {
	brigadeID?: RecordIdString
	name?: string
	type: UnitsTypeOptions
	unitnumber?: number
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
	role: UsersRoleOptions
	unit_id?: RecordIdString[]
}

// Response types include system fields and match responses from the PocketBase API
export type AssessmentsResponse<Texpand = unknown> = Required<AssessmentsRecord> & BaseSystemFields<Texpand>
export type BrigadesResponse<Texpand = unknown> = Required<BrigadesRecord> & BaseSystemFields<Texpand>
export type IncidentsResponse<Texpand = unknown> = Required<IncidentsRecord> & BaseSystemFields<Texpand>
export type VictimsResponse<Texpand = unknown> = Required<VictimsRecord> & BaseSystemFields<Texpand>
export type UnitsResponse<Texpand = unknown> = Required<UnitsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	Assessments: AssessmentsRecord
	Brigades: BrigadesRecord
	Incidents: IncidentsRecord
	Victims: VictimsRecord
	units: UnitsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	Assessments: AssessmentsResponse
	Brigades: BrigadesResponse
	Incidents: IncidentsResponse
	Victims: VictimsResponse
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
	collection(idOrName: 'units'): RecordService<UnitsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
