import { GetPlaylist } from "@/utils/playlist";
import { Card, Text, Button, Group, Flex, Container, createStyles } from "@mantine/core";
import { create } from "zustand";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface SongState {
  song: Song | undefined;
  changeSong: (index: number) => void;
}

const useSongStore = create<SongState>((set) => ({
  song: undefined,
  changeSong: (index: number) => set((state: any) => ({ song: GetPlaylist()[index] })),
}));

function Playlist() {
  const playlist = GetPlaylist() as Song[];

  return (
    <div className="h-screen">
      <Songs playlist={playlist} />
      <Details />
    </div>
  );
}

export default Playlist;

const useStyles = createStyles((theme) => ({
  button: {
    "&:hover": {
      borderBottom: "1px solid white",
    },
  },

  card: {
    backgroundColor: theme.colors.dark[7],
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderTop: `1px solid ${theme.colors.dark[5]}`,
  },
}));

function Songs({ playlist }: { playlist: Song[] }) {
  const { classes } = useStyles();
  const changeSong = useSongStore((state) => state.changeSong);

  return (
    <Container size="lg" px="xs" mt="sm">
      <Flex
        mih={50}
        bg="rgba(0, 0, 0, .3)"
        gap="md"
        justify="space-around"
        align="center"
        direction="row"
        wrap="wrap"
      >
        {playlist.map((s, i) => {
          return (
            <Button
              variant="light"
              size="lg"
              color="gray"
              key={i}
              className={`${classes.button} ${inter.className}`}
              data-array-index={i}
              onClick={() => {
                changeSong(i);
              }}
            >
              {s.song_name}
            </Button>
          );
        })}
      </Flex>
    </Container>
  );
}

function Details() {
  const { classes } = useStyles();

  const song = useSongStore((state) => state.song);
  if (!song)
    return (
      <Container size="lg" px="xs" mt="sm">
        <Card withBorder p="lg" className={classes.card}>
          <Group position="apart">
            <Text size="sm" weight={700} className={`${inter.className}`}>
              No song selected!
            </Text>
          </Group>
        </Card>
      </Container>
    );

  const { song_name, artist, album, duration, release_date, genre, youtube_url, spotify_url } =
    song;

  return (
    <Container size="lg" px="xs" mt="sm">
      <Card withBorder p="lg" className={classes.card}>
        <Group position="left">
          <Text size="sm" weight={700} className={`${inter.className}`}>
            {song_name}
          </Text>
        </Group>
        <Text mt="sm" mb="md" color="dimmed" size="xs" className={`${inter.className}`}>
          {artist}
        </Text>
        <Text mt="sm" mb="md" color="dimmed" size="xs" className={`${inter.className}`}>
          {album}
        </Text>
        <Text mt="sm" mb="md" color="dimmed" size="xs" className={`${inter.className}`}>
          {duration}
        </Text>
        <Text mt="sm" mb="md" color="dimmed" size="xs" className={`${inter.className}`}>
          {release_date}
        </Text>
        <Text mt="sm" color="dimmed" size="xs" className={`${inter.className}`}>
          {genre}
        </Text>
      </Card>
    </Container>
  );
}

type Song = {
  song_name: string;
  artist: string;
  album: string;
  duration: string;
  release_date: string;
  genre: string;
  youtube_url: string;
  spotify_url: string;
};
