import contrast from "contrast";
import randomColor from "randomcolor";

import { MACHINE_ISSUES } from "../db/machine-issues";
import { EXTENDABLE_PRIVILEGES, POSITIONS_CONFIG } from "../db/positions";
import type {
  Na3AppId,
  Na3Department,
  Na3DepartmentId,
  Na3DepartmentType,
  Na3Machine,
  Na3Position,
  Na3PositionId,
  Na3PositionIdBase,
  WebColor,
} from "../modules/na3-types";

type DepartmentCreatorConfig<T extends Na3DepartmentType> = Omit<
  Na3Department<T>,
  | "apps"
  | "location"
  | "machines"
  | "people"
  | "positions"
  | "style"
  | "twoLetterId"
  | "type"
> & {
  apps: Na3AppId[];
  color: Exclude<WebColor, "grey">;
  positions: Na3PositionIdBase[];
};

type PositionIdsParserConfig = {
  departmentId: Na3DepartmentId;
};

type DepartmentStyleCreatorConfig = {
  webColor: Exclude<WebColor, "grey">;
};

type DepartmentStyleCreatorOptions = {
  forceTextColor?: "dark" | "light";
};

function parsePositionIds(
  positionBaseIds: Na3PositionIdBase[],
  { departmentId }: PositionIdsParserConfig
): Na3Position[] {
  return positionBaseIds
    .filter((posBaseId, idx, arr) => arr.indexOf(posBaseId) === idx)
    .map((posBaseId) => {
      const posConfig = POSITIONS_CONFIG[posBaseId];
      const posId: Na3PositionId = `${departmentId}.${posBaseId}`;

      return {
        departmentId,
        id: posId,
        level: posConfig.level,
        name: posConfig.name,
        privileges: [
          ...(posConfig.extends || []).flatMap(
            (extended) => EXTENDABLE_PRIVILEGES[extended]
          ),
          ...(posConfig.privileges || []),
        ],
        shortName: posConfig.shortName,
      };
    });
}

function createApps(appIds: Na3AppId[]): Na3Department["apps"] {
  const apps: Na3Department["apps"] = {};

  appIds.forEach((appId) => {
    apps[appId] = { id: appId, pushTokens: [] };
  });

  return apps;
}

function createDptStyle(
  dptId: Na3DepartmentId,
  config: DepartmentStyleCreatorConfig,
  options?: DepartmentStyleCreatorOptions
): Na3Department["style"] {
  const bgColor: Na3Department["style"]["colors"]["background"] = randomColor({
    seed: dptId,
  });
  const textStyle: "dark" | "light" =
    options?.forceTextColor || contrast(bgColor);

  return {
    colors: {
      background: bgColor,
      text: textStyle === "light" ? "#011936" : "#FFF7F8",
      web: config.webColor,
    },
  };
}

export function createShopFloorDpt(
  config: DepartmentCreatorConfig<"shop-floor"> & {
    machines: Record<string, Omit<Na3Machine, "id" | "issues" | "number">>;
    twoLetterId: string;
  },
  options?: DepartmentStyleCreatorOptions
): Na3Department<"shop-floor"> {
  const dptMachines: Na3Department<"shop-floor">["machines"] = {};

  Object.entries(config.machines).forEach(([id, machine], idx) => {
    dptMachines[id] = {
      ...machine,
      id,
      issues: MACHINE_ISSUES[config.id],
      number: idx + 1,
    };
  });

  return {
    apps: createApps(config.apps),
    displayName: config.displayName,
    id: config.id,
    location: "factory",
    machines: dptMachines,
    name: config.name,
    people: [],
    positions: parsePositionIds(config.positions, { departmentId: config.id }),
    style: createDptStyle(config.id, { webColor: config.color }, options),
    twoLetterId: config.twoLetterId,
    type: "shop-floor",
  };
}

export function createFactoryAdmDpt(
  config: DepartmentCreatorConfig<"factory-adm">,
  options?: DepartmentStyleCreatorOptions
): Na3Department<"factory-adm"> {
  return {
    apps: createApps(config.apps),
    displayName: config.displayName,
    id: config.id,
    location: "factory",
    machines: null,
    name: config.name,
    people: [],
    positions: parsePositionIds(config.positions, { departmentId: config.id }),
    style: createDptStyle(config.id, { webColor: config.color }, options),
    twoLetterId: null,
    type: "factory-adm",
  };
}

export function createOfficeDpt(
  config: DepartmentCreatorConfig<"office">,
  options?: DepartmentStyleCreatorOptions
): Na3Department<"office"> {
  return {
    apps: createApps(config.apps),
    displayName: config.displayName,
    id: config.id,
    location: "office",
    machines: null,
    name: config.name,
    people: [],
    positions: parsePositionIds(config.positions, { departmentId: config.id }),
    style: createDptStyle(config.id, { webColor: config.color }, options),
    twoLetterId: null,
    type: "office",
  };
}
