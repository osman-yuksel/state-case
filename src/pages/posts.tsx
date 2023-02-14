import { atom, useAtom } from "jotai";
import { Suspense } from "react";
import { createStyles, Paper, Text, Container, Title } from "@mantine/core";

const postData = atom(async () => {
  const data = await (await fetch("https://jsonplaceholder.typicode.com/posts")).json();
  return data as Post[];
});

export default function Posts() {
  const [data] = useAtom(postData);
  return (
      <Container size="lg" px="xs">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          {data.map((p, i) => (
            <CardGradient {...p} key={i} />
          ))}
        </Suspense>
      </Container>
  );
}

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 100ms ease",
    padding: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    margin: theme.spacing.md,

    "&:hover": {
      boxShadow: theme.shadows.md,
    },

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 0,
      backgroundImage: theme.fn.linearGradient(0, theme.colors.pink[6], theme.colors.orange[6]),
      transitionDuration: "100ms",
    },

    "&:hover::before": {
      width: 6,
    },
  },
}));

function CardGradient({ title, body }: Post) {
  const { classes } = useStyles();
  return (
    <Paper withBorder radius="md" className={classes.card}>
      <Text size="xl" weight={500}>
        {title}
      </Text>
      <Text size="sm" mt="sm" color="dimmed">
        {body}
      </Text>
    </Paper>
  );
}
