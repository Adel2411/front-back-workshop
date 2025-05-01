import express from "express";
import fs from "fs";
import path from "path";
import { Member } from "../types/member";

const router = express.Router();
const dbPath = path.join(__dirname, "../../db/members.json");

const readMembers = (): Member[] => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeMembers = (members: Member[]) => {
  fs.writeFileSync(dbPath, JSON.stringify(members, null, 2));
};

router.get("/", (req, res) => {
  const members = readMembers();
  for (const member of members) {
    console.log(
      `Member ID: ${member.id}, DiscordId : ${member.discordId}, Name: ${member.name}`,
    );
  }
  res.json(members);
});

router.post("/", (req, res) => {
  const members = readMembers();
  const newMember: Member = {
    id: Date.now().toString(),
    ...req.body,
  };
  members.push(newMember);
  writeMembers(members);
  res.status(201).json(newMember);
});

router.put("/:id", (req, res) => {
  const members = readMembers();
  const index = members.findIndex((m) => m.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: "Member not found" });
    return;
  }

  members[index] = { ...members[index], ...req.body };
  writeMembers(members);
  res.json(members[index]);
});

router.delete("/:id", (req, res) => {
  const members = readMembers();
  const updated = members.filter((m) => m.id !== req.params.id);
  if (members.length === updated.length) {
    res.status(404).json({ error: "Member not found" });
    return;
  }

  writeMembers(updated);
  res.json({ message: "Deleted successfully" });
});

export default router;
