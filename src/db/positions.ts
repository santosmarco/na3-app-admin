import type {
  Na3Position,
  Na3PositionIdBase,
  Na3UserPrivilegeId,
} from "../modules/na3-types";

type ExtendablePrivilegesKey =
  | "diretor"
  | "manutencao"
  | "pcp"
  | "producao"
  | "super";

export const EXTENDABLE_PRIVILEGES: Record<
  ExtendablePrivilegesKey,
  Na3UserPrivilegeId[]
> = {
  manutencao: [
    "maint_projects_read_all",
    "maint_projects_write_all",
    "service_orders_read_all",
    "service_orders_write_maintenance",
  ],
  diretor: [
    "labels_transf_print_all",
    "maint_projects_read_all",
    "service_orders_read_all",
  ],
  pcp: ["labels_transf_manage_all", "labels_transf_print_all"],
  producao: [
    "labels_transf_print_own",
    "service_orders_read_own",
    "service_orders_write_shop_floor",
  ],
  super: ["_super"],
};

export const POSITIONS_CONFIG: Record<
  Na3PositionIdBase,
  Omit<Na3Position, "departmentId" | "id" | "privileges"> & {
    extends?: ExtendablePrivilegesKey[];
    privileges?: Na3UserPrivilegeId[];
  }
> = {
  "gerente-industrial": {
    extends: ["diretor"],
    level: 12,
    name: "Gerente Industrial",
    shortName: "Gerente Industrial",
    privileges: ["labels_transf_manage_all"],
  },
  "coordenador-manutencao": {
    extends: ["manutencao"],
    level: 10,
    name: "Coordenador de Manutenção Industrial",
    shortName: "Coordenador de Manutenção",
  },
  "eletricista-1": {
    extends: ["manutencao"],
    level: 8,
    name: "Eletricista de Manutenção Industrial I",
    shortName: "Eletricista I",
  },
  "eletricista-2": {
    extends: ["manutencao"],
    level: 6,
    name: "Eletricista de Manutenção Industrial II",
    shortName: "Eletricista II",
  },
  "mecanico-1": {
    extends: ["manutencao"],
    level: 8,
    name: "Mecânico de Manutenção Industrial I",
    shortName: "Mecânico I",
  },
  "mecanico-2": {
    extends: ["manutencao"],
    level: 7,
    name: "Mecânico de Manutenção Industrial II",
    shortName: "Mecânico II",
  },
  "serralheiro-industrial": {
    extends: ["manutencao"],
    level: 6,
    name: "Serralheiro Industrial",
    shortName: "Serralheiro Industrial",
  },
  "assistente-manutencao": {
    extends: ["manutencao"],
    level: 3,
    name: "Assistente de Manutenção",
    shortName: "Assist. Manutenção",
  },
  "assistente-compras-manutencao": {
    extends: ["manutencao"],
    level: 3,
    name: "Assistente de Compras da Manutenção",
    shortName: "Assist. Compras (Manutenção)",
  },
  "assistente-pcp": {
    extends: ["pcp"],
    level: 3,
    name: "Assistente de PCP",
    shortName: "Assist. PCP",
  },
  "assistente-compras-pcp": {
    extends: ["pcp"],
    level: 3,
    name: "Assistente de Compras do PCP",
    shortName: "Assist. Compras (PCP)",
  },
  "supervisor-qualidade": {
    level: 9,
    name: "Supervisor de Garantia da Qualidade",
    shortName: "Supervisor",
  },
  "analista-qualidade": {
    level: 5,
    name: "Analista de Garantia da Qualidade",
    shortName: "Analista",
  },
  "inspetor-qualidade-1": {
    level: 4,
    name: "Inspetor de Garantia da Qualidade I",
    shortName: "Inspetor I",
  },
  "inspetor-qualidade-2": {
    level: 3,
    name: "Inspetor de Garantia da Qualidade II",
    shortName: "Inspetor II",
  },
  "diretor-operacoes": {
    extends: ["diretor"],
    level: 13,
    name: "Diretor de Operações",
    shortName: "COO",
  },
  "diretor-financeiro": {
    extends: ["diretor"],
    level: 13,
    name: "Diretor Financeiro",
    shortName: "CFO",
  },
  "cortador-guilhotina": {
    extends: ["producao"],
    level: 7,
    name: "Cortador da Guilhotina",
    shortName: "Cortador",
  },
  "supervisor-producao": {
    extends: ["producao"],
    level: 9,
    name: "Supervisor da Produção",
    shortName: "Supervisor",
  },
  "lider-turno": {
    extends: ["producao"],
    level: 7,
    name: "Líder de Turno",
    shortName: "Líder",
  },
  "auxiliar-producao": {
    level: 1,
    name: "Auxiliar de Produção",
    shortName: "Aux. Produção",
  },
  extrusor: {
    extends: ["producao"],
    level: 7,
    name: "Extrusor",
    shortName: "Extrusor",
  },
  "operador-flexo": {
    extends: ["producao"],
    level: 2,
    name: "Operador Flexo",
    shortName: "Operador",
  },
  "impressor-flexo-1": {
    level: 6,
    name: "Impressor Flexo I",
    shortName: "Impressor Flexo I",
  },
  "impressor-flexo-2": {
    level: 5,
    name: "Impressor Flexo II",
    shortName: "Impressor Flexo II",
  },
  "assistente-reciclagem": {
    level: 3,
    name: "Assistente de Reciclagem",
    shortName: "Assist. Reciclagem",
  },
  "operador-1": {
    level: 2,
    name: "Operador I",
    shortName: "Operador I",
  },
  "operador-2": {
    level: 2,
    name: "Operador II",
    shortName: "Operador II",
  },
  desenvolvedor: {
    extends: ["super"],
    level: 13,
    name: "Desenvolvedor",
    shortName: "Desenvolvedor",
  },
};

export default POSITIONS_CONFIG;
