/**
  * @returns number 85166 (lbs per year)
 */
module.exports.getTotalTrashInLbs = () => {
 const mswPerPersonPeryearInLlbs = 2555
 const industrialWastePercent = 97
 const totalMSWImpactInLbs = mswPerPersonPeryearInLlbs * 100 / (100-industrialWastePercent)
 return totalMSWImpactInLbs
}

/**
  * @returns number 7664 (trash bags)
 */
module.exports.getTotalTrashBags = () => {
 const totalTrashinLbs = getTotalTrashInLbs()
 const gallonsPerPound = 0.9
 const gallonsPerTrashBag = 10
 const totalTrashBags = (totalTrashinLbs * gallonsPerPound) / gallonsPerTrashBag
 return totalTrashBags
}
