import {
  getEditorialQueueSnapshot,
  getFeederNetworkSnapshot,
  listEditorialQueueRows,
  listFeederRegistryRows
} from "@tx24/shared";

export function listFeederRegistryPayload() {
  return {
    snapshot: getFeederNetworkSnapshot(),
    items: listFeederRegistryRows()
  };
}

export function listEditorialQueuePayload() {
  return {
    snapshot: getEditorialQueueSnapshot(),
    items: listEditorialQueueRows()
  };
}
