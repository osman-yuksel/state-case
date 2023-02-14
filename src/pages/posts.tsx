import { atom, useAtom } from "jotai";
import { Suspense } from "react";
import { createStyles, Paper, Text, Container, Title } from "@mantine/core";
import Head from "next/head";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

const postData = atom(async () => {
  const data = await (await fetch("https://jsonplaceholder.typicode.com/posts")).json();
  return data as Post[];
});

export default function Posts() {
  const [data] = useAtom(postData);
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Container size="lg" px="xs">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          {data.map((p, i) => (
            <CardGradient {...p} key={i} />
          ))}
        </Suspense>
      </Container>
    </>
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
    background: "var(--card-rgb)",

    "&:hover": {
      boxShadow: theme.shadows.md,
      borderColor: "var(--foreground-rgb)",
      background: "rgba(var(--card-rgb), 0.1)",
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

  title: {
    margin: theme.spacing.md,
    borderBottom: "1px solid white",
  },
}));

function CardGradient({ title, body }: Post) {
  const { classes } = useStyles();
  return (
    <Paper withBorder radius="sm" className={classes.card} tabIndex={1}>
      <Text size="xl" weight={500} className={inter.className}>
        {title}
      </Text>
      <Text size="sm" mt="sm" color="dimmed" className={inter.className}>
        {body}
      </Text>
    </Paper>
  );
}

function Header() {
  const { classes } = useStyles();
  return <Title className={`${classes.title} ${inter.className}`}>Posts</Title>;
}
