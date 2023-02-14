import { GetPlaylist } from "@/utils/playlist";
import { Card, Text, Button, Group, Flex, Container, createStyles } from "@mantine/core";

function Playlist() {
  const playlist = GetPlaylist() as Song[];

  return (
    <div className="h-screen">
      <Songs playlist={playlist} />
      <Details song={playlist[0]} />
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
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

function Songs({ playlist }: { playlist: Song[] }) {
  const { classes } = useStyles();

  return (
    <Container size="lg" px="xs">
      <Flex
        mih={50}
        bg="rgba(0, 0, 0, .3)"
        gap="md"
        justify="center"
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
              className={classes.button}
              data-array-index={i}
            >
              {s.song_name}
            </Button>
          );
        })}
      </Flex>
    </Container>
  );
}

function Details({ song }: { song: Song }) {
  const { song_name, artist, album, duration, release_date, genre, youtube_url, spotify_url } =
    song;
  const { classes } = useStyles();

  return (
    <Container size="lg" px="xs">
      <Card withBorder p="lg" className={classes.card}>
        <Group position="apart" mt="xl">
          <Text size="sm" weight={700} className={classes.title}>
            {song_name}
          </Text>
        </Group>
        <Text mt="sm" mb="md" color="dimmed" size="xs">
          {artist}
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
