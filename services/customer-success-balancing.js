function customerSuccessBalancing(customerSuccessList, customerList, customerSuccessAwayList) {
  const availableCSList = getAvailableCustomerSuccessList(customerSuccessList, customerSuccessAwayList);
  const unattendedCustomers =  customerList.sort((a, b) => a.score - b.score);

  const CSes = calculateCustomersCountForCSList(availableCSList, unattendedCustomers);

  const [firstCS, secondCS] = CSes.sort((a, b) => b.customersCount - a.customersCount)
  .slice(0, 2);

  return firstCS.customersCount === secondCS.customersCount ? 0 : firstCS.id;
}

function getAvailableCustomerSuccessList(customerSuccessList, customerSuccessAwayList) {
  return customerSuccessList.filter(cs => !customerSuccessAwayList.includes(cs.id))
                             .sort((a, b) => a.score - b.score);
}

function calculateCustomersCountForCSList(availableCSList, unattendedCustomers) {
  const CSes = [];

  for (const cs of availableCSList) {
    let customersCount = 0;

    for (let interator = 0; interator < unattendedCustomers.length; interator++) {
      if (unattendedCustomers[interator].score <= cs.score) {
        unattendedCustomers.splice(interator, 1);
        customersCount++;
        interator--; // Ajuste para lidar com o deslocamento do índice após a remoção do elemento
      } else {
        break; // Sai do loop se o cliente atual não for adequado para o CS atual
      }
    }

    CSes.push({ ...cs, customersCount });
  }

  return CSes;
}


module.exports = {
  customerSuccessBalancing
};