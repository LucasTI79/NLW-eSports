import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import convertHoursToMinutes from './utils/convert-hours-to-minutes';
import convertMinutesToHourString from './utils/convert-minutes-to-hours';

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}));

const prisma = new PrismaClient({
  log: ['query']
});

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  });
  const status = games.length ? 200 : 204;
  res.status(status).json(games);
});

app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const { name, yearsPlaying, discord, weekDays, hourStart, hourEnd, useVoiceChannel } = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name, 
      yearsPlaying, 
      discord, 
      weekDays: weekDays.join(','), 
      hourStart: convertHoursToMinutes(hourStart), 
      hourEnd: convertHoursToMinutes(hourEnd), 
      useVoiceChannel
    }
  })

  res.status(201).json(ad);
});

app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true
    },
    where: {
      gameId: gameId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  const status = ads.length ? 200 : 204;
  res.status(status).json(ads.map(ad => ({
    ...ad,
    weekDays: ad.weekDays.split(','),
    hourStart: convertMinutesToHourString(ad.hourStart),
    hourEnd: convertMinutesToHourString(ad.hourEnd),
  })))
})

app.get('/ads/:id/discord', async (req, res) => {
  const adsId = req.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adsId
    },
  })
  res.json({
    discord: ad?.discord
  })
})

app.listen(3333, () => console.log("App running at http://localhost:3333"))