import type {
  Na3Department,
  Na3DepartmentId,
  Na3DepartmentType,
} from "../modules/na3-types";
import {
  createFactoryAdmDpt,
  createOfficeDpt,
  createShopFloorDpt,
} from "../utils";

export const DEPARTMENTS: {
  [Type in Na3DepartmentType]: Record<
    Na3DepartmentId<Type>,
    Na3Department<Type>
  >;
} = {
  "factory-adm": {
    administrativo: createFactoryAdmDpt({
      apps: ["manut", "transf"],
      displayName: "Administrativo",
      id: "administrativo",
      name: "Administrativo",
      positions: ["gerente-industrial"],
      color: "cyan",
    }),
    manutencao: createFactoryAdmDpt({
      apps: ["manut"],
      displayName: "Manutenção",
      id: "manutencao",
      name: "Manutenção",
      positions: [
        "coordenador-manutencao",
        "eletricista-1",
        "eletricista-2",
        "mecanico-1",
        "mecanico-2",
        "serralheiro-industrial",
        "assistente-manutencao",
        "assistente-compras-manutencao",
      ],
      color: "red",
    }),
    pcp: createFactoryAdmDpt({
      apps: ["manut", "transf"],
      displayName: "PCP",
      id: "pcp",
      name: "Planejamento & Controle da Produção",
      positions: ["assistente-pcp", "assistente-compras-pcp"],
      color: "orange",
    }),
    qualidade: createFactoryAdmDpt({
      apps: ["transf"],
      displayName: "Qualidade",
      id: "qualidade",
      name: "Qualidade",
      positions: [
        "supervisor-qualidade",
        "analista-qualidade",
        "inspetor-qualidade-1",
        "inspetor-qualidade-2",
      ],
      color: "blue",
    }),
  },

  office: {
    comex: createOfficeDpt({
      apps: ["manut", "transf"],
      displayName: "Comércio Exterior",
      id: "comex",
      name: "Comércio Exterior",
      positions: ["gerente-comex"],
      color: "green",
    }),
    desenvolvimento: createOfficeDpt({
      apps: ["manut", "transf"],
      displayName: "Desenvolvimento",
      id: "desenvolvimento",
      name: "Desenvolvimento",
      positions: ["desenvolvedor"],
      color: "geekblue",
    }),
    diretoria: createOfficeDpt({
      apps: ["manut", "transf"],
      displayName: "Diretoria",
      id: "diretoria",
      name: "Diretoria",
      positions: ["diretor-operacoes", "diretor-financeiro"],
      color: "gold",
    }),
  },

  "shop-floor": {
    corte: createShopFloorDpt({
      apps: ["manut", "transf"],
      displayName: "Corte",
      id: "corte",
      machines: {
        M1: { name: "Guilhotina", hourlyProdRate: null, prodUnit: null },
      },
      name: "Corte",
      positions: ["cortador-guilhotina"],
      twoLetterId: "CG",
      color: "lime",
    }),
    "corte-solda-luva": createShopFloorDpt({
      apps: ["manut", "transf"],
      displayName: "Corte & Solda – Luva",
      id: "corte-solda-luva",
      machines: {
        M1: { name: "Luva 1", hourlyProdRate: 3900, prodUnit: "mil" },
        M2: { name: "Luva 2", hourlyProdRate: 3900, prodUnit: "mil" },
        M3: { name: "Luva 3", hourlyProdRate: 3900, prodUnit: "mil" },
        M4: { name: "Touca", hourlyProdRate: 3900, prodUnit: "mil" },
      },
      name: "Corte & Solda – Luva",
      positions: [
        "supervisor-producao",
        "lider-turno",
        "auxiliar-producao",
        "operador-mantenedor",
      ],
      twoLetterId: "CL",
      color: "yellow",
    }),
    "corte-solda-saco": createShopFloorDpt({
      apps: ["manut", "transf"],
      displayName: "Corte & Solda – Saco",
      id: "corte-solda-saco",
      machines: {
        M1: { name: "Maqplas 1", hourlyProdRate: 3600, prodUnit: "mil" },
        M2: { name: "Maqplas 2", hourlyProdRate: 3600, prodUnit: "mil" },
        M3: { name: "Maqplas 3", hourlyProdRate: 3600, prodUnit: "mil" },
        M4: { name: "Maqplas 4", hourlyProdRate: 3600, prodUnit: "mil" },
      },
      name: "Corte & Solda – Saco",
      positions: [
        "supervisor-producao",
        "lider-turno",
        "auxiliar-producao",
        "operador-mantenedor",
      ],
      twoLetterId: "CM",
      color: "yellow",
    }),
    dobra: createShopFloorDpt({
      apps: ["manut", "transf"],
      displayName: "Dobra",
      id: "dobra",
      machines: {
        M1: { name: "Dobra 1", hourlyProdRate: null, prodUnit: null },
        M2: { name: "Dobra 2", hourlyProdRate: null, prodUnit: null },
        M3: { name: "Dobra 3", hourlyProdRate: null, prodUnit: null },
        M4: { name: "Dobra 4", hourlyProdRate: null, prodUnit: null },
        M5: { name: "Dobra 5", hourlyProdRate: null, prodUnit: null },
        M6: { name: "Dobra 6", hourlyProdRate: null, prodUnit: null },
        M7: { name: "Dobra 7", hourlyProdRate: null, prodUnit: null },
      },
      name: "Dobra",
      positions: ["lider-turno", "auxiliar-dobra"],
      twoLetterId: "DB",
      color: "green",
    }),
    ekoplasto: createShopFloorDpt({
      apps: ["manut", "transf"],
      displayName: "EkoPlasto",
      id: "ekoplasto",
      machines: {
        EL: { name: "Elétrica...", hourlyProdRate: null, prodUnit: null },
        M1: { name: "Aglutinador", hourlyProdRate: null, prodUnit: null },
        M2: {
          name: "Extrusora Recicladora",
          hourlyProdRate: null,
          prodUnit: null,
        },
        M3: { name: "Moinho a Seco", hourlyProdRate: null, prodUnit: null },
        M4: { name: "Moinho da Lavagem", hourlyProdRate: null, prodUnit: null },
        M5: { name: "Secadora", hourlyProdRate: null, prodUnit: null },
        M6: { name: "Tanque de Lavagem", hourlyProdRate: null, prodUnit: null },
        M7: { name: "Ventoinhas", hourlyProdRate: null, prodUnit: null },
        M8: { name: "Sem-fins", hourlyProdRate: null, prodUnit: null },
      },
      name: "EkoPlasto",
      positions: ["gerente-ekoplasto"],
      twoLetterId: "EK",
      color: "orange",
    }),
    extrusao: createShopFloorDpt({
      apps: ["manut", "transf"],
      displayName: "Extrusão",
      id: "extrusao",
      machines: {
        M1: { name: "Extrusora 1", hourlyProdRate: 150, prodUnit: "kg" },
        M2: { name: "Extrusora 2", hourlyProdRate: 50, prodUnit: "kg" },
        M3: { name: "Extrusora 3", hourlyProdRate: 50, prodUnit: "kg" },
        M4: { name: "Extrusora Plana", hourlyProdRate: 50, prodUnit: "kg" },
      },
      name: "Extrusão",
      positions: [
        "supervisor-producao",
        "extrusor-1",
        "extrusor-2",
        "auxiliar-extrusao",
      ],
      twoLetterId: "EX",
      color: "cyan",
    }),
    "flexografia-papel": createShopFloorDpt({
      apps: ["manut", "transf"],
      displayName: "Flexografia – Papel",
      id: "flexografia-papel",
      machines: {
        M1: { name: "Etirama 1", hourlyProdRate: 4800, prodUnit: "mil" },
        M2: { name: "Etirama 2", hourlyProdRate: 4800, prodUnit: "mil" },
        M3: { name: "Etirama 3", hourlyProdRate: 4800, prodUnit: "mil" },
      },
      name: "Flexografia – Papel",
      positions: ["lider-turno", "impressor-flexo-2"],
      twoLetterId: "IF",
      color: "geekblue",
    }),
    "flexografia-plastico": createShopFloorDpt({
      apps: ["manut", "transf"],
      displayName: "Flexografia – Plástico",
      id: "flexografia-plastico",
      machines: {
        M1: { name: "Drucken", hourlyProdRate: 4800, prodUnit: "mil" },
      },
      name: "Flexografia – Plástico",
      positions: ["operador-flexo"],
      twoLetterId: "ID",
      color: "geekblue",
    }),
    "kit-automatico": createShopFloorDpt({
      apps: ["manut", "transf"],
      displayName: "Kit Automático",
      id: "kit-automatico",
      machines: {
        D1: { name: "Dobradeira 1", hourlyProdRate: 6600, prodUnit: "mil" },
        D10: { name: "Dobradeira 10", hourlyProdRate: 6600, prodUnit: "mil" },
        D11: { name: "Dobradeira 11", hourlyProdRate: 6600, prodUnit: "mil" },
        D12: { name: "Dobradeira 12", hourlyProdRate: 6600, prodUnit: "mil" },
        D13: { name: "Dobradeira 13", hourlyProdRate: 6600, prodUnit: "mil" },
        D14: { name: "Dobradeira 14", hourlyProdRate: 6600, prodUnit: "mil" },
        D15: { name: "Dobradeira 15", hourlyProdRate: 6600, prodUnit: "mil" },
        D16: { name: "Dobradeira 16", hourlyProdRate: 6600, prodUnit: "mil" },
        D2: { name: "Dobradeira 2", hourlyProdRate: 6600, prodUnit: "mil" },
        D3: { name: "Dobradeira 3", hourlyProdRate: 6600, prodUnit: "mil" },
        D4: { name: "Dobradeira 4", hourlyProdRate: 6600, prodUnit: "mil" },
        D5: { name: "Dobradeira 5", hourlyProdRate: 6600, prodUnit: "mil" },
        D6: { name: "Dobradeira 6", hourlyProdRate: 6600, prodUnit: "mil" },
        D7: { name: "Dobradeira 7", hourlyProdRate: 6600, prodUnit: "mil" },
        D8: { name: "Dobradeira 8", hourlyProdRate: 6600, prodUnit: "mil" },
        D9: { name: "Dobradeira 9", hourlyProdRate: 6600, prodUnit: "mil" },
        M1: { name: "Joke 1", hourlyProdRate: 6600, prodUnit: "mil" },
        M2: { name: "Joke 2", hourlyProdRate: 6600, prodUnit: "mil" },
        M3: { name: "Joke 3", hourlyProdRate: 6600, prodUnit: "mil" },
        M4: { name: "Joke 4", hourlyProdRate: 6600, prodUnit: "mil" },
        M5: { name: "Joke 5", hourlyProdRate: 6600, prodUnit: "mil" },
        M6: { name: "Joke 6", hourlyProdRate: 6600, prodUnit: "mil" },
        M7: { name: "Joke 7", hourlyProdRate: 6600, prodUnit: "mil" },
      },
      name: "Kit Automático",
      positions: [
        "supervisor-producao",
        "lider-turno",
        "operador-2",
        "auxiliar-producao",
      ],
      twoLetterId: "KA",
      color: "blue",
    }),
    "kit-manual": createShopFloorDpt({
      apps: ["manut", "transf"],
      displayName: "Kit Manual",
      id: "kit-manual",
      machines: {
        M1: { name: "FlowPack 1", hourlyProdRate: null, prodUnit: null },
        M2: { name: "FlowPack 2", hourlyProdRate: null, prodUnit: null },
      },
      name: "Kit Manual",
      positions: [
        "supervisor-producao",
        "lider-turno",
        "auxiliar-producao",
        "operador-mantenedor",
      ],
      twoLetterId: "FK",
      color: "volcano",
    }),
    "off-set": createShopFloorDpt({
      apps: ["manut", "transf"],
      displayName: "Off-Set",
      id: "off-set",
      machines: {
        M1: { name: "Rotateck", hourlyProdRate: 6600, prodUnit: "mil" },
        M2: { name: "Maqforms", hourlyProdRate: 6600, prodUnit: "mil" },
        M3: { name: "DIDE 1", hourlyProdRate: 6600, prodUnit: "mil" },
        M4: { name: "DIDE 2", hourlyProdRate: 6600, prodUnit: "mil" },
      },
      name: "Off-Set",
      positions: ["impressor-flexo-2", "encarregado-off-set"],
      twoLetterId: "IO",
      color: "magenta",
    }),
    reciclagem: createShopFloorDpt({
      apps: ["manut", "transf"],
      displayName: "Reciclagem",
      id: "reciclagem",
      machines: {
        M1: { name: "Recicladora", hourlyProdRate: null, prodUnit: null },
      },
      name: "Reciclagem",
      positions: [
        "supervisor-producao",
        "lider-turno",
        "auxiliar-producao",
        "assistente-reciclagem",
        "operador-reciclagem-1",
        "operador-reciclagem-2",
      ],
      twoLetterId: "RC",
      color: "red",
    }),
    "super-kit": createShopFloorDpt({
      apps: ["manut", "transf"],
      displayName: "Super Kit",
      id: "super-kit",
      machines: {
        M1: { name: "FlowPack 1", hourlyProdRate: null, prodUnit: null },
        M2: { name: "FlowPack 2", hourlyProdRate: null, prodUnit: null },
      },
      name: "Super Kit",
      positions: [
        "supervisor-producao",
        "lider-turno",
        "auxiliar-producao",
        "operador-mantenedor",
      ],
      twoLetterId: "FK",
      color: "purple",
    }),
  },
};

export default DEPARTMENTS;
