import type {
  Na3Position,
  Na3PositionIdBase,
  Na3UserPrivilegeId,
} from "../modules/na3-types";

type ExtendablePrivilegesKey =
  | "comex"
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
    "docs_std_read_all",
    /* TEMPORARY */
    "docs_std_write_new",
  ],
  pcp: [
    "labels_transf_manage_all",
    "labels_transf_print_all",
    "service_orders_read_all",
    "maint_projects_read_all",
  ],
  producao: [
    "labels_transf_print_own",
    "service_orders_read_own",
    "service_orders_write_shop_floor",
  ],
  comex: ["comex_read_all", "comex_write_all"],
  super: ["_super"],
};

export const POSITIONS_CONFIG: Record<
  Na3PositionIdBase,
  Omit<Na3Position, "departmentId" | "id" | "privileges"> & {
    extends?: ExtendablePrivilegesKey[];
    privileges?: Na3UserPrivilegeId[];
  }
> = {
  /* Diretoria */
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

  /* Gerência Adm */
  "gerente-industrial": {
    extends: ["diretor"],
    level: 12,
    name: "Gerente Industrial",
    shortName: "Gerente Industrial",
    privileges: ["labels_transf_manage_all"],
  },

  /* COMEX */
  "gerente-comex": {
    extends: ["comex"],
    level: 12,
    name: "Gerente de Comércio Exterior",
    shortName: "Gerente COMEX",
  },

  /* Manutenção */
  "coordenador-manutencao": {
    extends: ["manutencao"],
    level: 10,
    name: "Coordenador de Manutenção Industrial",
    shortName: "Coordenador de Manutenção",
  },
  "gerente-manutencao": {
    extends: ["manutencao"],
    level: 10,
    name: "Gerente de Manutenção Industrial",
    shortName: "Gerente de Manutenção",
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

  /* PCP */
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

  /* Qualidade */
  "supervisor-qualidade": {
    level: 9,
    name: "Supervisor de Garantia da Qualidade",
    shortName: "Supervisor da Qualidade",
  },
  "analista-qualidade": {
    level: 5,
    name: "Analista de Garantia da Qualidade",
    shortName: "Analista da Qualidade",
  },
  "inspetor-qualidade-1": {
    level: 4,
    name: "Inspetor de Garantia da Qualidade I",
    shortName: "Inspetor da Qualidade I",
  },
  "inspetor-qualidade-2": {
    level: 3,
    name: "Inspetor de Garantia da Qualidade II",
    shortName: "Inspetor da Qualidade II",
  },

  /* Produção */
  "supervisor-producao": {
    extends: ["producao"],
    level: 9,
    name: "Supervisor de Produção",
    shortName: "Supervisor de Produção",
  },
  "lider-turno": {
    extends: ["producao"],
    level: 7,
    name: "Líder de Turno da Produção",
    shortName: "Líder de Turno",
  },
  "cortador-guilhotina": {
    extends: ["producao"],
    level: 7,
    name: "Cortador da Guilhotina",
    shortName: "Cortador",
  },
  "extrusor-1": {
    level: 6,
    name: "Extrusor I",
    shortName: "Extrusor I",
  },
  "extrusor-2": {
    extends: ["producao"],
    level: 6,
    name: "Extrusor II",
    shortName: "Extrusor II",
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
  "auxiliar-producao": {
    level: 1,
    name: "Auxiliar de Produção",
    shortName: "Aux. Produção",
  },
  "auxiliar-extrusao": {
    extends: ["producao"],
    level: 1,
    name: "Auxiliar de Produção",
    shortName: "Aux. Produção",
  },
  "operador-1": {
    level: 2,
    name: "Operador de Produção I",
    shortName: "Operador de Produção I",
  },
  "operador-2": {
    level: 2,
    name: "Operador de Produção II",
    shortName: "Operador de Produção II",
  },
  "operador-mantenedor": {
    extends: ["producao"],
    level: 2,
    name: "Operador Mantenedor",
    shortName: "Operador Mantenedor",
  },
  "operador-flexo": {
    extends: ["producao"],
    level: 2,
    name: "Operador Flexo",
    shortName: "Operador de Produção",
  },
  "encarregado-off-set": {
    extends: ["producao"],
    level: 2,
    name: "Encarregado de Produção",
    shortName: "Encarregado de Produção",
  },
  "assistente-reciclagem": {
    level: 3,
    name: "Assistente de Reciclagem",
    shortName: "Assist. Reciclagem",
  },
  "operador-reciclagem-1": {
    level: 2,
    name: "Operador II",
    shortName: "Operador de Produção II",
  },
  "operador-reciclagem-2": {
    extends: ["producao"],
    level: 2,
    name: "Operador II",
    shortName: "Operador de Produção II",
  },

  /* Desenvolvimento */
  desenvolvedor: {
    extends: ["super"],
    level: 13,
    name: "Desenvolvedor",
    shortName: "Desenvolvedor",
  },
};

export default POSITIONS_CONFIG;
