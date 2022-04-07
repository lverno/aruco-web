<script lang="ts">
  import { onMount } from "svelte";
  import { Canvas, Layer, t } from "svelte-canvas";
  import jsaruco from "js-aruco";
  const { AR, POS2 } = jsaruco;

  // Canvas width and height
  const width = 600;
  const height = 500;

  // Initialize video object with camera
  let video;
  onMount(async () => {
    video.srcObject = await navigator.mediaDevices.getUserMedia({
      video: {
        width: width / 100,
        height: height / 100,
      },
    });
  });

  // Initialize aruco detector
  const detector = new AR.Detector();
  const posit = new POS2.Posit(100, width);

  // Store markers
  let markers;

  // Render each frame
  $: render = ({ context, width, height }) => {
    // Force redraw
    const _ = $t;

    // Draw image from camera
    context.drawImage(video, 0, 0, width, height);

    // Get image data from canvas
    const imageData = context.getImageData(0, 0, width, height);
    // Detect markers
    markers = detector.detect(imageData);

    // 3D pose estimation
    for (const marker of markers) {
      marker.pose = posit.pose(marker.corners);
    }
  };
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video bind:this={video} autoplay hidden />

<main>
  <h1>Aruco test</h1>

  <Canvas {width} {height}>
    <Layer {render} />
  </Canvas>

  <h2>Markers:</h2>
  {#if markers !== undefined}
    <ul>
      {#each markers as marker}
        <li>
          <ul>
            <li>
              Marker {marker.id}
            </li>
            <li>
              Translation
              <table>
                {#each marker.pose.bestTranslation as pos}
                  <td>{pos.toFixed(3)}</td>
                {/each}
              </table>
            </li>
            <li>
              Rotation
              <table>
                {#each marker.pose.bestRotation as rot}
                  <tr>
                    {#each rot as angle}
                      <td>{angle.toFixed(3)}</td>
                    {/each}
                  </tr>
                {/each}
              </table>
            </li>
          </ul>
        </li>
      {/each}
    </ul>
  {/if}
</main>

<style>
  * {
    font-family: sans-serif;
  }

  h1 {
    display: flex;
    justify-content: center;
  }

  main {
    width: 600px;
    margin: 0 auto;
  }
</style>
