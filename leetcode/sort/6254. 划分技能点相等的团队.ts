// https://leetcode.cn/problems/divide-players-into-teams-of-equal-skill/
// 脑子题，排序后最小最大分组即可
function dividePlayers(skill: number[]): number {
  // 因为各队总和相同，各队伍的平均技能点都应是sum/(n/2)
  // 又结合数组性质，为了平均相等，排序后应该恰好前加后组成队伍才可能平均
  skill.sort((b, f) => b - f);
  const len = skill.length, mid = len / 2 - 1; // 一定是偶数个
  const val = skill[0] + skill[len - 1];
  let res = skill[0] * skill[len - 1];
  for (let i = 1; i <= mid; i++) {
    if (skill[i] + skill[len - 1 - i] == val)
      res += skill[i] * skill[len - 1 - i];
    else return -1;
  }
  return res;
};