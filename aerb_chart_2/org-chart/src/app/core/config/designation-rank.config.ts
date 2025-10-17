/**
 * Configuration file for employee designation hierarchy ranks
 * 
 * This file contains the ranking system for organizational hierarchy.
 * Lower numbers indicate higher positions in the hierarchy.
 * 
 * To modify the hierarchy:
 * 1. Update the rank values in this file
 * 2. The changes will automatically be reflected in the organization chart
 * 
 * Note: PAs (Personal Assistants) are intentionally placed at the bottom (rank 11)
 * as they support other employees rather than managing them.
 */

export const DESIGNATION_RANK_CONFIG: Record<string, number> = {
    Chairperson: 1,
    Director: 2,
    Head: 3,
    CAO: 3,
    DCA: 3,
    PA: 11, // PAs are at the bottom of the hierarchy
    'Section Head': 4,
    SOF: 5,
    SOE: 6,
    SOD: 7,
    SOC: 8,
    Manager: 9,
    Staff: 10
};

/**
 * Get the rank for a given designation
 * @param designation - The employee designation
 * @returns The rank number (lower = higher in hierarchy)
 */
export function getDesignationRank(designation: string): number {
    return DESIGNATION_RANK_CONFIG[designation] ?? Number.MAX_SAFE_INTEGER;
}

/**
 * Get all available designations sorted by rank
 * @returns Array of designations sorted from highest to lowest rank
 */
export function getDesignationsByRank(): string[] {
    return Object.entries(DESIGNATION_RANK_CONFIG)
        .sort(([, rankA], [, rankB]) => rankA - rankB)
        .map(([designation]) => designation);
}

/**
 * Check if a designation exists in the configuration
 * @param designation - The designation to check
 * @returns True if the designation exists in the configuration
 */
export function isValidDesignation(designation: string): boolean {
    return designation in DESIGNATION_RANK_CONFIG;
}

