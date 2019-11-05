/**
  * @returns number 85166 (lbs per year)
 */
module.exports.getTotalTrashInLbs = () => {
 // source: https://archive.epa.gov/epawaste/nonhaz/municipal/web/html/
 const personalWasteTotalPerYear = 2555

 // source: https://frontiergroup.org/reports/fg/trash-america
 const industrialWastePercent = 97
 
 // personalWasteTotal/x = personalWastePercent/100
 const totalMSWImpactInLbs = personalWasteTotalPerYear * 100 / (100-industrialWastePercent)
 return totalMSWImpactInLbs
}

/**
  * @returns number 7664 (trash bags)
 */
module.exports.getTotalTrashBags = () => {
 const totalTrashinLbs = getTotalTrashInLbs()
 
 // source: https://westerndisposalservices.com/how-much-does-it-weigh-household-trash/
 const gallonsPerPound = 0.9
 const gallonsPerTrashBag = 10

 const totalTrashBags = (totalTrashinLbs * gallonsPerPound) / gallonsPerTrashBag
 return totalTrashBags
}
