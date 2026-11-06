export type NonEmptyArray<Item> = [Item, ...Item[]];

export function groupConsecutiveBy<Item>(
  items: Item[],
  groupKeyOf: (item: Item) => string | undefined,
): NonEmptyArray<Item>[] {
  return items.reduce<NonEmptyArray<Item>[]>((groups, item) => {
    const groupKey = groupKeyOf(item);
    const lastGroup = groups.at(-1);
    const continuesLastGroup =
      groupKey !== undefined &&
      lastGroup !== undefined &&
      groupKeyOf(lastGroup[0]) === groupKey;
    if (lastGroup && continuesLastGroup) {
      lastGroup.push(item);
      return groups;
    }
    return [...groups, [item]];
  }, []);
}
