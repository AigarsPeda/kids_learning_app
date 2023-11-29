type ItemWithId = {
  id: string; // Change the type of id as needed
};

type ArgsType<T extends ItemWithId> = {
  allItems: T[];
  countOfItems: number;
};

const getRandomItems = <T extends ItemWithId>({
  allItems,
  countOfItems,
}: ArgsType<T>): T[] => {
  const selectedItems: T[] = [];
  const totalItems = allItems.length;

  if (countOfItems > totalItems) {
    throw new Error(
      "countOfItems cannot be greater than the total number of items."
    );
  }

  while (selectedItems.length < countOfItems) {
    const randomIndex = Math.floor(Math.random() * totalItems);
    const selectedItem = allItems[randomIndex];

    // Check if the selected item is not already in the result array
    if (!selectedItems.some((item) => item.id === selectedItem.id)) {
      selectedItems.push(selectedItem);
    }
  }

  return selectedItems;
};

export default getRandomItems;
