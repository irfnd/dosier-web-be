const allRoles = {
	admin: ["manageProfile", "manageUsers"],
	atasan: ["manageProfile"],
	pegawai: ["manageProfile"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
	roles,
	roleRights,
};
