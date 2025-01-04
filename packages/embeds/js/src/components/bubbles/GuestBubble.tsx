import { FilePreview } from "@/features/blocks/inputs/fileUpload/components/FilePreview";
import type {
  InputSubmitContent,
  RecordingInputSubmitContent,
  TextInputSubmitContent,
} from "@/types";
import { isMobile } from "@/utils/isMobileSignal";
import { isNotEmpty } from "@typebot.io/lib/utils";
import clsx from "clsx";
import { For, Match, Show, Switch, createSignal } from "solid-js";
import { Modal } from "../Modal";
import { Avatar } from "../avatars/Avatar";

type Props = {
  answer?: InputSubmitContent;
  showAvatar: boolean;
  avatarSrc?: string;
  hasHostAvatar: boolean;
};

export const GuestBubble = (props: Props) => {
  return (
    <div
      class="flex justify-end items-end animate-fade-in gap-2 guest-container"
      style={{
        "margin-left": props.hasHostAvatar
          ? isMobile()
            ? "28px"
            : "50px"
          : undefined,
      }}
    >
      <Switch>
        <Match when={props.answer?.type === "text"}>
          <TextGuestBubble answer={props.answer as TextInputSubmitContent} />
        </Match>
        <Match when={props.answer?.type === "recording"}>
          <AudioGuestBubble
            answer={props.answer as RecordingInputSubmitContent}
          />
        </Match>
      </Switch>

      <Show when={props.showAvatar}>
        <Avatar initialAvatarSrc={props.avatarSrc} />
      </Show>
    </div>
  );
};

const TextGuestBubble = (props: { answer: TextInputSubmitContent }) => {
  const [clickedImageSrc, setClickedImageSrc] = createSignal<string>();

  return (
    <div class="flex flex-col gap-1 items-end">
      <Show when={(props.answer.attachments ?? []).length > 0}>
        <div
          class={clsx(
            "flex gap-1 overflow-auto max-w-[350px]",
            isMobile() ? "flex-wrap justify-end" : "items-center",
          )}
        >
          <For
            each={props.answer.attachments?.filter((attachment) =>
              attachment.type.startsWith("image"),
            )}
          >
            {(attachment, idx) => (
              <img
                src={attachment.blobUrl ?? attachment.url}
                alt={`Attached image ${idx() + 1}`}
                class={clsx(
                  "typebot-guest-bubble-image-attachment cursor-pointer",
                  props.answer.attachments!.filter((attachment) =>
                    attachment.type.startsWith("image"),
                  ).length > 1 && "max-w-[90%]",
                )}
                onClick={() =>
                  setClickedImageSrc(attachment.blobUrl ?? attachment.url)
                }
              />
            )}
          </For>
        </div>
        <div
          class={clsx(
            "flex gap-1 overflow-auto max-w-[350px]",
            isMobile() ? "flex-wrap justify-end" : "items-center",
          )}
        >
          <For
            each={props.answer.attachments?.filter(
              (attachment) => !attachment.type.startsWith("image"),
            )}
          >
            {(attachment) => (
              <FilePreview
                file={{
                  name: attachment.url.split("/").at(-1)!,
                }}
              />
            )}
          </For>
        </div>
      </Show>
      <div
        class="p-[1px] whitespace-pre-wrap max-w-full typebot-guest-bubble flex flex-col"
        data-testid="guest-bubble"
      >
        <Show when={isNotEmpty(props.answer.label ?? props.answer.value)}>
          <span class="px-[15px] py-[7px]">
            {props.answer.label ?? props.answer.value}
          </span>
        </Show>
        <div>
          <span class="hora2">{`${String(new Date().getHours()).padStart(
            2,
            "0",
          )}:${String(new Date().getMinutes()).padStart(2, "0")}`}</span>
          <svg
            id="checkIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 38.626 24.684"
            style="position: absolute;bottom: 2px;right: 5px;"
            height="20"
            width="18"
          >
            <g
              id="Grupo_1"
              data-name="Grupo 1"
              transform="translate(-708.9 -601.383)"
            >
              <path
                id="Caminho_6"
                data-name="Caminho 6"
                d="M728.035,623.468l1.382,1.482,17.929-20.334"
                transform="translate(-1.937 -1.117)"
                fill="none"
                stroke="#29afdf"
                stroke-linecap="round"
                stroke-width="3"
              ></path>
              <path
                id="Caminho_7"
                data-name="Caminho 7"
                d="M712.017,616.07l7.088,8.039,17.757-20.14"
                transform="translate(-1 -0.469)"
                fill="none"
                stroke="#29afdf"
                stroke-linecap="round"
                stroke-width="3"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <Modal
        isOpen={clickedImageSrc() !== undefined}
        onClose={() => setClickedImageSrc(undefined)}
      >
        <img
          src={clickedImageSrc()}
          alt="Attachment"
          style={{ "border-radius": "6px" }}
        />
      </Modal>
    </div>
  );
};

const AudioGuestBubble = (props: { answer: RecordingInputSubmitContent }) => {
  return (
    <div class="flex flex-col gap-1 items-end">
      <div
        class="p-2 w-full whitespace-pre-wrap typebot-guest-bubble flex flex-col"
        data-testid="guest-bubble"
      >
        <audio controls src={props.answer.blobUrl ?? props.answer.url} />
      </div>
    </div>
  );
};
